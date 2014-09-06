import java.io.File;
import java.util.Scanner;


public class StockConfig {
	public static String LIST;
	public static String OUTPUT;
	static{
		try{
			Scanner file = new Scanner(new File("conf.txt"));
			LIST = file.nextLine();
			OUTPUT = file.nextLine();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
