import java.io.*;
import java.util.*;
public class StockList {
	public static ArrayList<StockCompany> list;
	static{
		list = new ArrayList<StockCompany>();
		try{
			Scanner file = new Scanner(new File("list.txt"));
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
