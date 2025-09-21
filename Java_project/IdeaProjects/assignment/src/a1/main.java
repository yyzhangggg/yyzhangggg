
package a1;
import java.io.*;
import java.util.*;


public class main {


	public static void main(String[] args) {

		//Codepost test

		Open_Addressing test0 = new Open_Addressing(10, 0, -1);
		if (test0.probe(1, 0) != 30) {
			System.out.println("Test 0 failed.");
		}else {
			System.out.println("Test 0 passed.");
		}

		if (test0.probe(1, 1) != 31) {
			System.out.println("Test 1 failed.");
		}else {
			System.out.println("Test 1 passed.");
		}

		if (test0.probe(1, 3) != 1) {
			System.out.println("Test 2 failed.");
		}else {
			System.out.println("Test 2 passed.");
		}

		Chaining test1 = new Chaining(10, 0, -1);
		if (test1.chain(1) != 30) {
			System.out.println("Test 3 failed.");
		}else {
			System.out.println("Test 3 passed.");
		}

		if (test1.chain(4) != 25) {
			System.out.println("Test 4 failed.");
		}else {
			System.out.println("Test 4 passed.");
		}

		if (test1.chain(8) != 19) {
			System.out.println("Test 5 failed.");
		}else {
			System.out.println("Test 5 passed.");
		}




		Open_Addressing test7 = new Open_Addressing(10, 0, -1);
		for (int i = 1; i < 26; i++) {
			//System.out.println(Integer.toString(i)+" "+ Arrays.toString(test7.Table));
			test7.insertKeyResize(i);
			if (test7.Table.length != 32 && i == 25) {
				System.out.println("Test 7 passed.");
			}else if (test7.Table.length != 32) {
				System.out.println(i);
				System.out.println(Arrays.toString(test7.Table));
				System.out.println("Test 7 failed.");
			}
		}

		Open_Addressing test8 = new Open_Addressing(10, 0, -1);
		int acc = 0;
		int[] arr = new int[3];
		for (int i = 1; i < 100; i++) {
			if (test8.probe(i, 0) == test8.probe(0, 0)) {
				arr[acc] = i;
				acc++;
				if (acc == 3) {
					break;
				}
			}
		}
		test8.insertKeyArray(arr);
		//System.out.println(Arrays.toString(test8.Table));
		test8.removeKey(40);
		//System.out.println(Arrays.toString(test8.Table));
		//System.out.println(Arrays.toString(test8.searchKeyOptimized(60)));
		//System.out.println(Arrays.toString(test8.Table));

		if (test8.searchKeyOptimized(60)[0] == 1 && test8.Table[1] == 60) {
			System.out.println("Test 8 passed.");
		}else {
			System.out.println("Test 8 failed.");
		}



		int k9 = 0;
		Open_Addressing test9 = new Open_Addressing(10, 0, -1);
		int[] arr9 = test9.collidingKeys(k9, 10, 10);
		//System.out.println(Arrays.toString(arr9));
		for (int num: arr9) {
			if (test9.probe(num, 0) != test9.probe(k9, 0)) {
				System.out.println("Test 9 failed.");
				break;
			}if (num == arr9[9]) {
				System.out.println("Test 9 passed.");
			}
		}


		int k10 = 1;
		Open_Addressing test10 = new Open_Addressing(10, 0, -1);
		int[] arr10 = test10.collidingKeys(k10, 10, 10);
		//System.out.println(Arrays.toString(arr10));
		for (int num: arr10) {
			if (test10.probe(num, 0) != test10.probe(k10, 0)) {
				System.out.println("Test 10 failed.");
				break;
			}if (num == arr10[9]) {
				System.out.println("Test 10 passed.");
			}
		}

	}


}