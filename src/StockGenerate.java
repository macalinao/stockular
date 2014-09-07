import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;


public class StockGenerate {
	static class Container{
		StockCompany name;
		HashMap<String, String> values;
		ArrayList<StockValue> graph;
		Container(StockCompany n, HashMap<String, String> v, ArrayList<StockValue> g){
			name = n; values = v; graph = g;
		}
	}
	public static void main(String[] args)throws Exception{
		String[] sr = new String[StockList.list.size()];
		for(int i = 0; i<sr.length; i++)
			sr[i] = StockList.list.get(i).symbol;
		HashMap<String, HashMap<String, String>> val = new StockInfo(sr).getValues();
		for(int i = 0; i<sr.length; i++){
			StockInfoGraph graph1 = new StockInfoGraph(sr[i], 5);
			ArrayList<StockValue> g1 = graph1.getGraph();
			PrintWriter out = new PrintWriter(StockConfig.OUTPUT + sr[i]+".json");
			out.println(QuickJson.toJson(new Container(StockList.list.get(i), val.get(StockList.list.get(i).symbol + " US Equity"), g1)));
			out.close();
			System.out.println("Done " + sr[i]);
		}
	}
}
