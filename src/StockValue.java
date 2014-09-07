

import java.util.Date;

public class StockValue{
	long date;
	double value;
	long volume;
	StockValue(long d, double v, long vol){
		date = d;
		value = v;
		volume = vol;
	}
	public String toString(){
		return String.format("[%s - %.2f (%d)]", date, value, volume);
	}
}