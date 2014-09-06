import java.io.File;
import java.util.Scanner;


public class StockConfig {
	public static String LIST;
	static{
		try{
			Scanner file = new Scanner(new File("conf.txt"));
			LIST = file.nextLine();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
