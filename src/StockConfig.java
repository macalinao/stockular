import java.io.File;
import java.util.Scanner;


public class StockConfig {
	public static String LIST = "list.json";
	public static String OUTPUT;
	static{
		try{
			Scanner file = new Scanner(new File("conf.txt"));
			OUTPUT = file.nextLine();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
