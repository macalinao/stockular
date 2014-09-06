import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;


public class StockGenerate {
	class Container{
		StockCompany name;
		HashMap<String, String> values;
		ArrayList<StockValue> graph;
	}
	public static void main(String[] args)throws Exception{
		String[] sr = new String[StockList.list.size()];
		for(int i = 0; i<sr.length; i++)
			sr[i] = StockList.list.get(i).symbol;
		
		for(StockCompany c : StockList.list){
			StockInfoGraph graph1 = new StockInfoGraph(c.symbol, 5);
			ArrayList<StockValue> g1 = graph1.getGraph();
			PrintWriter out = new PrintWriter(StockConfig.OUTPUT + c.symbol+".json");
			out.println(QuickJson.toJson(g1));
			out.close();
		}
	}
}
