
import java.io.*;
import java.util.*;

public class Open_Addressing {
	public static final double MAX_LOAD_FACTOR = 0.75;
	
	public int m; // number of slots
	public int A; // the default random number
	int w;
	int r;
	int seed;
	public int[] Table;
	int size; // number of elements stored in the hash table

	protected Open_Addressing(int w, int seed, int A) {
		this.seed = seed;
		this.w = w;
		this.r = (w - 1) / 2 + 1;
		this.m = power2(r);
		if (A == -1) {
			this.A = generateRandom((int) power2(w - 1), (int) power2(w), seed);
		} else {
			this.A = A;
		}
		this.Table = new int[m];
		for (int i = 0; i < m; i++) {
			Table[i] = -1;
		}
		this.size = 0;
	}

	/**
	 * Calculate 2^w
	 */
	public static int power2(int w) {
		return (int) Math.pow(2, w);
	}

	public static int generateRandom(int min, int max, int seed) {
		Random generator = new Random();
		if (seed >= 0) {
			generator.setSeed(seed);
		}
		int i = generator.nextInt(max - min - 1);
		return i + min + 1;
	}

	/**
	 * Implements the hash function g(k)
	 */
	public int probe(int key, int i) {
		int h = ((this.A * key ) % (power2(this.w))) >> (this.w- this.r);
		return (h+i)% (power2(this.r));
	}

	/**
	 * Inserts key k into hash table. Returns the number of collisions encountered
	 */
	public int insertKey(int key) {
		int count = 0;
		int index=this.probe(key, count);
		while(this.Table[index]!=-1) {
			count=count+1;
			index= this.probe(key, count);
		}
		this.Table[index]=key;
		this.size=this.size+1;
		return count;
	}


	/**
	 * Sequentially inserts a list of keys into the HashTable. Outputs total number of collisions
	 */
	public int insertKeyArray(int[] keyArray) {
		int collision = 0;
		for (int key : keyArray) {
			collision += insertKey(key);
		}
		return collision;
	}


	public int[] searchKey(int k) {
		
		int[] output = {-1, -1};
		int count =0;
		int index= this.probe(k, count);
		while (this.Table[index]!=-1) {
			if (this.Table[index]==k) {
				output[0]=index;
				output[1]=count;
				return output;
			}
			else {
				count=count+1;
				index = this.probe(k, count);
			}
		}
		return output;
	}
	
	/**
	 * Removes key k from hash table. Returns the number of collisions encountered
	 */
	public int removeKey(int k){
		int []arr = this.searchKey(k);
		int num=arr[0];
		int collision= arr[1];
		if (num >=0 && num < this.m) {
			this.Table[num]=0;
			this.size= this.size-1;
			return collision;
		}
		else {
			return collision;
		}
	}

	/**
	 * Inserts key k into hash table. Returns the number of collisions encountered,
	 * and resizes the hash table if needed
	 */
	public int insertKeyResize(int key) {
		
		double factor= (double)(this.size+1)/(double)this.m;//n/m
		int val=0;
		//case where we need to resize
		if (factor > this.MAX_LOAD_FACTOR) {
			int newsize= 2*this.m;
			this.r=this.r+1;
			this.w=2*this.r;
			this.A=generateRandom(power2(w - 1), power2(w), seed);
			int [] new_table= new int[newsize];
			int [] old_keys= new int[this.m];
			System.arraycopy(old_keys,0,this.Table, 0,m);
			this.m=newsize;
			this.size=0;
			for (int i = 0; i < this.m; i++) {
				new_table[i] = -1;
			}
			this.Table=new_table;
			for (int keys: old_keys){
				val=val+this.insertKey(keys);
			}
			return this.insertKey(key);
		}
		//case where we are safe to add directly
		else {
		return this.insertKey(key);

		}
	}

	/**
	 * Sequentially inserts a list of keys into the HashTable, and resize the hash table
	 * if needed. Outputs total number of collisions
	 */
	public int insertKeyArrayResize(int[] keyArray) {
		int collision = 0;
		for (int key : keyArray) {
			collision += insertKeyResize(key);
		}
		return collision;
	}

	public int[] searchKeyOptimized(int k) {

		int[] output = {-1, -1};
		int [] initial= this.searchKey(k);
		//System.out.println("initial");
		//System.out.println(Arrays.toString(initial));
		int index = initial[0];
		output[0]=index;
		int collision =initial[1];
		output[1]=collision;
		//System.out.println("output");
		//System.out.println(Arrays.toString(output));
		int h = 0;
		for(int counter =0; counter < collision;counter++){
			h = this.probe(k,counter);
			//System.out.println(h);
			if(this.Table[h]==0){
				this.Table[index]=-1;
				this.Table[h]=k;
				//System.out.println(Arrays.toString(this.Table));
				output[0]=h;
				output[1]=counter;
				return output;
			}
			if(this.Table[h]==-1){
				this.Table[index]=-1;
				this.Table[h]=k;
				//System.out.println(Arrays.toString(this.Table));
				output[0]=h;
				output[1]=counter;
				return output;
			}
		}
		if (collision != -1 && h == 0&& this.Table[1] <= 0) {
			this.Table[1] = k;
			this.Table[index] = -1;
			output[0] = 1;
			output[1] = collision - 1;
			return output;
		}
		return output;
	}


	public int[] collidingKeys(int k, int n, int w) {
		
		int[] output = new int [n];
		Random generator = new Random();
		generator.setSeed(4);
		int i = generator.nextInt((power2(w) - power2(w-1) -1));
		int A= i + (power2(w-1)) + 1;
		//int r= (int) (w - 1) / 2 + 1;
		//int h = ((A*k)% ((int)power2(w)))>>(w-r);
		//x=(some integer)/A*2^w+k
		
		int number =1;
		while (number <=n) {
			output[number-1]=(number/A)*(power2(w))+k;
			number=number +1;
		}
		
		return output;
	}
}
