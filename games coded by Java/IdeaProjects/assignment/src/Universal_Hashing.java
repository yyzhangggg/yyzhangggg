package a1;
import java.io.*;
import java.util.*;

public class Universal_Hashing extends Open_Addressing{
	int a;
	int b;
	int p;

	protected Universal_Hashing(int w, int seed) {
		super(w, seed, -1);
		int temp = m+1; // m is even, so temp is odd here
		while(!isPrime(temp)) {
			temp += 2;
		}
		this.p = temp;
		a = generateRandom(0, p, seed);
		b = generateRandom(-1, p, seed);
	}
	
	/**
	 * Checks if the input int is prime
	 */
	public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i*i <= n; i++) {
        	if (n % i == 0) return false;
        }
        return true;
    }
	
	/**
     * Implements universal hashing
     */

    public int probe(int key, int i) {
    	
		int k = ((this.a * key +this.b) % this.p)% m;
		int f =  (k+i)% (power2(r));
		return f;
    }

    /**
     * Inserts key k into hash table. Returns the number of collisions encountered,
     * and resizes the hash table if needed
     */
    public int insertKeyResize(int key) {
		int factor = size/m;
		if (factor > 0.75) {
			int newsize= 2*this.m;
			this.m = newsize;
			this.r=this.r+1;
			this.w=2*this.r;
			this.A=generateRandom(power2(w - 1), power2(w), seed);
			int [] newtable= new int[newsize];
			int [] oldkeys=this.Table;
			for (int i = 0; i < this.m; i++) {
				newtable[i] = -1;
			}
			this.Table=newtable;
			for (int keys : oldkeys) {
				this.insertKey(keys);
			}
			int colli= this.insertKey(key);
			return colli;	
		}
		else {
			int coll= this.insertKey(key)	;
			return coll;
		}
    }
}
