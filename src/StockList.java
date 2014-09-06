import java.io.*;
import java.util.*;
public class StockList {
	static class StockCompany{
		String name;
		String symbol;
		StockCompany(String n, String s){
			name = n; symbol  = s;
		}
	}
	public static ArrayList<StockCompany> list;
	static{
		list = new ArrayList<StockCompany>();
		try{
			Scanner file = new Scanner(new File("work/list.txt"));
			while(file.hasNextLine()){
				String[] sr = file.nextLine().split("\t");
				list.add(new StockCompany(sr[0], sr[1]));
			}
			PrintWriter out = new PrintWriter(new File(StockConfig.LIST));
			out.print(QuickJson.toJson(list));
			out.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args){
		
	}
}
