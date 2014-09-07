

import java.io.PrintWriter;
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



public class StockInfoGraphLive {

	class StockValue{
		Date date;
		double value;
	}
	
    private static final Name TICK_DATA      = new Name("tickData");
    private static final Name COND_CODE      = new Name("conditionCodes");
    private static final Name SIZE           = new Name("size");
    private static final Name TIME           = new Name("time");
    private static final Name TYPE           = new Name("type");
    private static final Name VALUE          = new Name("value");
    private static final Name RESPONSE_ERROR = new Name("responseError");
    private static final Name CATEGORY       = new Name("category");
    private static final Name MESSAGE        = new Name("message");

    private String host;
    private int port;
    private String startDateTime;
    private String endDateTime;
    private String stock;
    private String security;
    public double value;
    public static void main(String[] args) throws Exception {
        StockInfoGraphLive example = new StockInfoGraphLive(args[0], 1);
        example.run();
        //PrintWriter out = new PrintWriter(StockConfig.OUTPUT+"val.json");
        //out.println(example.value);
        System.out.println(example.value);
        //out.close();
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
        date.set(Calendar.HOUR, 10);
        if( date.get(Calendar.MINUTE) == 0 )
        	date.set(Calendar.MINUTE, 1);
        return date;
    }

    public StockInfoGraphLive(String stock, int _int) {
        host = "10.8.8.1";
        port = 8194;
        this.stock = stock;
        security = stock+" US Equity";
    }

    private void run() throws Exception {
        SessionOptions sessionOptions = new SessionOptions();
        sessionOptions.setServerHost(host);
        sessionOptions.setServerPort(port);

        System.out.println("Connecting to " + host + ":" + port);
        Session session = new Session(sessionOptions);
        if (!session.start()) {
            System.err.println("Failed to start session.");
            return;
        }
        if (!session.openService("//blp/refdata")) {
            System.err.println("Failed to open //blp/refdata");
            return;
        }

        sendIntradayBarRequest(session);
        eventLoop(session);
        session.stop();
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
        Element data = msg.getElement(TICK_DATA).getElement(TICK_DATA);
        int numItems = data.numValues();
        //System.out.println("TIME\t\t\tTYPE\tVALUE\t\tSIZE\tCC");
        //System.out.println("----\t\t\t----\t-----\t\t----\t--");
        for (int i = 0; i < numItems; ++i) {
            Element item = data.getValueAsElement(i);
            Datetime time = item.getElementAsDate(TIME);
            String type = item.getElementAsString(TYPE);
            double value = item.getElementAsFloat64(VALUE);
            int size = item.getElementAsInt32(SIZE);
            String cc = "";
            if (item.hasElement(COND_CODE)) {
                cc = item.getElementAsString(COND_CODE);
            }

            /*System.out.println((time.calendar().getTime()) + "\t" +
                    type + "\t" +
                    (value) + "\t\t" +
                    (size) + "\t" +
                    cc);*/
            this.value = value;
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
                "IntradayTickRequest");

        request.set("security", security);
        Element eventTypes = request.getElement("eventTypes");
        eventTypes.appendValue("TRADE");

        if (startDateTime == null || endDateTime == null) {
            Calendar calendar = getPreviousTradingDate();
            Datetime prevTradeDateTime = new Datetime(calendar);

            // set the end date for next day
            calendar.roll(Calendar.MINUTE, -1);
            Datetime startDateTime = new Datetime(calendar);

            request.set("startDateTime", startDateTime);
            request.set("endDateTime", prevTradeDateTime);
        }
        else {
            request.set("startDateTime", startDateTime);
            request.set("endDateTime", endDateTime);
        }

        //System.out.println("Sending Request: " + request);
        session.sendRequest(request, null);
    }


    private void printErrorInfo(String leadingStr, Element errorInfo)
    throws Exception
    {
        System.out.println(leadingStr + errorInfo.getElementAsString(CATEGORY) +
                           " (" + errorInfo.getElementAsString(MESSAGE) + ")");
    }

}

