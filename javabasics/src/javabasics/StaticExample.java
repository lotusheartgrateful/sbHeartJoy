package javabasics;

public class StaticExample {

	private static String description;
	private static String version;

	StaticExample(String exType) {
		example_type = exType;
	}
	static {
		description = "This is a static class example";
		version = "1.0";
	}
	
	String example_type = null;
	
	public String getExampleType() {
		return this.example_type;
	}
	static class StaticClassExample {
		private static String description;
		static {
			description = "This is a static class example";
		}
		public static String object_desc = version;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		StaticExample myStaticExample = new StaticExample("Example Type One");
		display("Outer class description = " + description);
		display("Outer class description = " + version);
		display("Outer class object example type = " + myStaticExample.getExampleType());
		
		StaticExample.StaticClassExample staticInnerClassEx = new StaticExample.StaticClassExample();
		display("Inner class desc = " + staticInnerClassEx.description);
		display("Outer class desc = " + staticInnerClassEx.object_desc);
		
	}
	
	public static void display(String str) {
		System.out.println(str);
	}
}
