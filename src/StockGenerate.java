import java.io.PrintWriter;
import java.util.ArrayList;


public class StockGenerate {
	public static void main(String[] args)throws Exception{
		for(StockCompany c : StockList.list){
			StockInfoGraph graph1 = new StockInfoGraph(c.symbol, 10);
			ArrayList<StockValue> g1 = graph1.getGraph();
			PrintWriter out = new PrintWriter(StockConfig.OUTPUT + c.symbol+".json");
			out.println(QuickJson.toJson(g1));
			out.close();
		}
	}
}
