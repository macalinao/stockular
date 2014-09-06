import java.util.ArrayList;
import java.util.HashMap;

import com.bloomberglp.blpapi.CorrelationID;
import com.bloomberglp.blpapi.Element;
import com.bloomberglp.blpapi.Event;
import com.bloomberglp.blpapi.Message;
import com.bloomberglp.blpapi.MessageIterator;
import com.bloomberglp.blpapi.Name;
import com.bloomberglp.blpapi.Request;
import com.bloomberglp.blpapi.Service;
import com.bloomberglp.blpapi.Session;
import com.bloomberglp.blpapi.SessionOptions;


public class StockInfo {
    private static final Name SECURITY_DATA = new Name("securityData");
    private static final Name SECURITY = new Name("security");
    private static final Name FIELD_DATA = new Name("fieldData");
    private static final Name FIELD_EXCEPTIONS = new Name("fieldExceptions");
    private static final Name FIELD_ID = new Name("fieldId");
    private static final Name ERROR_INFO = new Name("errorInfo");

    private CorrelationID d_cid;

    public static void main(String[] args) throws Exception {
    	StockInfo example = new StockInfo("AAPL IBM TSLA".split(" "));
        System.out.println(example.getValues());
    }
    
    public StockInfo(String[] list){
    	com = list;
    }
    
    private String[] com;
    private ArrayList<HashMap<String, String>> values;

    public ArrayList<HashMap<String, String>> getValues() throws Exception {
        String serverHost = "10.8.8.1";
        int serverPort = 8194;
        
        values = new ArrayList<HashMap<String, String>>();

        SessionOptions sessionOptions = new SessionOptions();
        sessionOptions.setServerHost(serverHost);
        sessionOptions.setServerPort(serverPort);

        Session session = new Session(sessionOptions);

        System.out.println("Connecting to " + serverHost + ":" + serverPort);
        if (!session.start()) {
            System.err.println("Failed to start session.");
            return values;
        }
        System.out.println("Connected successfully.");

        if (!session.openService("//blp/refdata")) {
            System.err.println("Failed to open //blp/refdata");
            return values;
        }

        Service refDataService = session.getService("//blp/refdata");
        Request request = refDataService.createRequest("ReferenceDataRequest");

        Element securities = request.getElement("securities");
        for(String s : com)
        	securities.appendValue(s + " US Equity");
        Element fields = request.getElement("fields");
        String[]sr = ("PX_CLOSE PX_LOW PX_HIGH PX_VOLUME PE_RATIO CUR_MKT_CAP HIGH_52WEEK LOW_52WEEK "
        		+ "PX_OPEN VOLUME_AVG_30D DIVIDEND_YIELD TRAIL_12M_EPS EQY_SH_OUT_REAL EQY_BETA EQY_INST_PCT_SH_OUT "
        		+ "REL_PE_RATIO BEST_PEG_RATIO PX_TO_BOOK_RATIO PX_TO_SALES_RATIO EQY_DVD_YLD_IND").split(" ");

        for(String s : sr)
        	fields.appendValue(s);
        
        System.out.println("Sending Request: " + request);
        d_cid = session.sendRequest(request, null);

        while (true) {
            Event event = session.nextEvent();
            MessageIterator msgIter = event.messageIterator();
            while (msgIter.hasNext()) {
                Message msg = msgIter.next();
                if (msg.correlationID() == d_cid) {
                    processMessage(msg);
                }
            }
            if (event.eventType() == Event.EventType.RESPONSE) {
                break;
            }
        }
        return values;
    }

    private void processMessage(Message msg) throws Exception {
        Element securityDataArray = msg.getElement(SECURITY_DATA);
        int numSecurities = securityDataArray.numValues();
        for (int i = 0; i < numSecurities; ++i) {
            Element securityData = securityDataArray.getValueAsElement(i);
            //System.out.println(securityData.getElementAsString(SECURITY));
            Element fieldData = securityData.getElement(FIELD_DATA);
            //System.out.println(fieldData);
            HashMap<String, String> map = new HashMap<String, String>();
            for (int j = 0; j < fieldData.numElements(); ++j) {
                Element field = fieldData.getElement(j);
                map.put(field.name().toString(), field.getValueAsString());
            }
            values.add(map);
            /*Element fieldExceptionArray =
                securityData.getElement(FIELD_EXCEPTIONS);
            for (int k = 0; k < fieldExceptionArray.numValues(); ++k) {
                Element fieldException =
                    fieldExceptionArray.getValueAsElement(k);
                System.out.println(
                        fieldException.getElement(ERROR_INFO).getElementAsString("category")
                        + ": " + fieldException.getElementAsString(FIELD_ID));
            }
            System.out.println("\n");*/
        }
    }
}
