package javabasics;

public class GarbageCollectionExample {

	public void printMe(String str) {
		System.out.println(str);
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		GarbageCollectionExample example1 = new GarbageCollectionExample();
		example1.printMe("First object printed");
		
		GarbageCollectionExample example2 = new GarbageCollectionExample();
		example2.printMe("Second object printed");	
		
		example1 = null;
		example2 = null;
		
		System.gc();
	}

	protected void finalize() throws Throwable {
		System.out.println("Garbage Collection process completed");
	}
}
