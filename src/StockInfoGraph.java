

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import com.bloomberglp.blpapi.Datetime;
import com.bloomberglp.blpapi.Element;
import com.bloomberglp.blpapi.Event;
import com.bloomberglp.blpapi.Message;
import com.bloomberglp.blpapi.MessageIterator;
import com.bloomberglp.blpapi.Name;
import com.bloomberglp.blpapi.Request;
import com.bloomberglp.blpapi.Service;
import com.bloomberglp.blpapi.Session;
import com.bloomberglp.blpapi.SessionOptions;



public class StockInfoGraph {
	
    private static final Name BAR_DATA       = new Name("barData");
    private static final Name BAR_TICK_DATA  = new Name("barTickData");
    private static final Name OPEN           = new Name("open");
    private static final Name HIGH           = new Name("high");
    private static final Name LOW            = new Name("low");
    private static final Name CLOSE          = new Name("close");
    private static final Name VOLUME         = new Name("volume");
    private static final Name NUM_EVENTS     = new Name("numEvents");
    private static final Name TIME           = new Name("time");
    private static final Name RESPONSE_ERROR = new Name("responseError");
    private static final Name CATEGORY       = new Name("category");
    private static final Name MESSAGE        = new Name("message");

    private String            d_host;
    private int               d_port;
    private boolean           d_gapFillInitialBar;
    private String            d_startDateTime;
    private String            d_endDateTime;
    private SimpleDateFormat  d_dateFormat;
    private DecimalFormat     d_decimalFormat;
    private String stock;
    private String security;
    private int interval;
    private ArrayList<StockValue> list;

    public static void main(String[] args) throws Exception {
        StockInfoGraph example = new StockInfoGraph("AAPL", 2);
        System.out.println(example.getGraph());
    }

    private Calendar getPreviousTradingDate()
    {
        Calendar date = Calendar.getInstance();
        date.setTime(new Date());
        //date.roll(Calendar.DAY_OF_MONTH, -2);
        date.set(Calendar.DAY_OF_MONTH, 4);
        if (date.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
        	date.add(Calendar.DAY_OF_MONTH, -2);
        }
        else if (date.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
        	date.add(Calendar.DAY_OF_MONTH, -1);
        }
        return date;
    }

    public StockInfoGraph(String stock, int _int) {
        d_host = "10.8.8.1";
        d_port = 8194;
        interval = _int;
        this.stock = stock;
        security = stock+" US Equity";
        d_gapFillInitialBar = false;

        d_dateFormat = new SimpleDateFormat();
        d_dateFormat.applyPattern("MM/dd/yyyy k:mm");
        d_decimalFormat = new DecimalFormat();
        d_decimalFormat.setMaximumFractionDigits(3);
    }

    public ArrayList<StockValue> getGraph() throws Exception {
        list = new ArrayList<StockValue>();
        SessionOptions sessionOptions = new SessionOptions();
        sessionOptions.setServerHost(d_host);
        sessionOptions.setServerPort(d_port);

        System.out.println("Connecting to " + d_host + ":" + d_port);
        Session session = new Session(sessionOptions);
        if (!session.start()) {
            System.err.println("Failed to start session.");
            return list;
        }
        if (!session.openService("//blp/refdata")) {
            System.err.println("Failed to open //blp/refdata");
            return list;
        }

        sendIntradayBarRequest(session);
        eventLoop(session);
        session.stop();
        return list;
    }

    private void eventLoop(Session session) throws Exception {
        boolean done = false;
        while (!done) {
            Event event = session.nextEvent();
            if (event.eventType() == Event.EventType.PARTIAL_RESPONSE) {
                System.out.println("Processing Partial Response");
                processResponseEvent(event, session);
            }
            else if (event.eventType() == Event.EventType.RESPONSE) {
                System.out.println("Processing Response");
                processResponseEvent(event, session);
                done = true;
            } else {
                MessageIterator msgIter = event.messageIterator();
                while (msgIter.hasNext()) {
                    Message msg = msgIter.next();
                    System.out.println(msg);
                    if (event.eventType() == Event.EventType.SESSION_STATUS) {
                        if (msg.messageType().equals("SessionTerminated")) {
                            done = true;
                        }
                    }
                }
            }
        }
    }

    private void processMessage(Message msg) throws Exception {
        Element data = msg.getElement(BAR_DATA).getElement(BAR_TICK_DATA);
        int numBars = data.numValues();
        /*System.out.println("Response contains " + numBars + " bars");
        System.out.println("Datetime\t\tOpen\t\tHigh\t\tLow\t\tClose" +
                           "\t\tNumEvents\tVolume");*/
        for (int i = 0; i < numBars; ++i) {
            Element bar = data.getValueAsElement(i);
            Datetime time = bar.getElementAsDate(TIME);
            double open = bar.getElementAsFloat64(OPEN);
            double high = bar.getElementAsFloat64(HIGH);
            double low = bar.getElementAsFloat64(LOW);
            double close = bar.getElementAsFloat64(CLOSE);
            int numEvents = bar.getElementAsInt32(NUM_EVENTS);
            long volume = bar.getElementAsInt64(VOLUME);
            
            list.add(new StockValue(time.calendar().getTime(), close, volume));

            /*System.out.println(d_dateFormat.format(time.calendar().getTime()) + "\t" +
                    d_decimalFormat.format(open) + "\t\t" +
                    d_decimalFormat.format(high) + "\t\t" +
                    d_decimalFormat.format(low) + "\t\t" +
                    d_decimalFormat.format(close) + "\t\t" +
                    d_decimalFormat.format(numEvents) + "\t\t" +
                    d_decimalFormat.format(volume));*/
        }
    }

    private void processResponseEvent(Event event, Session session) throws Exception {
        MessageIterator msgIter = event.messageIterator();
        while (msgIter.hasNext()) {
            Message msg = msgIter.next();
            if (msg.hasElement(RESPONSE_ERROR)) {
                printErrorInfo("REQUEST FAILED: ", msg.getElement(RESPONSE_ERROR));
                continue;
            }
            processMessage(msg);
        }
    }

    private void sendIntradayBarRequest(Session session) throws Exception
    {
        Service refDataService = session.getService("//blp/refdata");
        Request request = refDataService.createRequest(
                "IntradayBarRequest");

        request.set("security", security);
        request.set("eventType", "TRADE");
        request.set("interval", interval);

        if (d_startDateTime == null || d_endDateTime == null) {
            Calendar calendar = getPreviousTradingDate();
            Datetime prevTradeDateTime = new Datetime(calendar);

            calendar.roll(Calendar.DAY_OF_MONTH, +1);
            Datetime endDateTime = new Datetime(calendar);

            request.set("startDateTime", prevTradeDateTime);
            request.set("endDateTime", endDateTime);
        }
        else {
            request.set("startDateTime", d_startDateTime);
            request.set("endDateTime", d_endDateTime);
        }

        if (d_gapFillInitialBar) {
            request.set("gapFillInitialBar", d_gapFillInitialBar);
        }

        System.out.println("Sending Request: " + request);
        session.sendRequest(request, null);
    }


    private void printErrorInfo(String leadingStr, Element errorInfo)
    throws Exception
    {
        System.out.println(leadingStr + errorInfo.getElementAsString(CATEGORY) +
                           " (" + errorInfo.getElementAsString(MESSAGE) + ")");
    }

}
