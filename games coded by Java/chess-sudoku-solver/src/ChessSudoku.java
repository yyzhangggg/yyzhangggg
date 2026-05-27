package finalproject;

import java.util.*;
import java.io.*;

public class ChessSudoku
{
	/* SIZE is the size parameter of the Sudoku puzzle, and N is the square of the size.  For 
	 * a standard Sudoku puzzle, SIZE is 3 and N is 9. 
	 */
	public int SIZE, N;

	/* The grid contains all the numbers in the Sudoku puzzle.  Numbers which have
	 * not yet been revealed are stored as 0. 
	 */
	public int grid[][];

	/* Booleans indicating whether of not one or more of the chess rules should be 
	 * applied to this Sudoku. 
	 */
	public boolean knightRule;
	public boolean kingRule;
	public boolean queenRule;

	
	// Field that stores the same Sudoku puzzle solved in all possible ways
	public HashSet<ChessSudoku> solutions = new HashSet<ChessSudoku>();
	
	private static boolean issafe(int [][] board, int row, int col, int num, boolean knightRule,boolean kingRule, boolean queenRule) {
		//check for row ***************************************************
		for (int i  = 0; i < board.length; i++) {
			if (board[row][i] ==num) {
				//System.out.println("same in row");
				return false;
			}
		}
		//check for column*************************************************
		for (int j = 0; j < board.length; j++) {
			if(board[j][col] ==num) {
				//System.out.println("same in col");
				return false;
			}
		}
		//check for uniqueness in nxn box**********************************
		int sqrt =(int)Math.sqrt(board.length);
		//System.out.println(sqrt);
		if(sqrt ==3) {
			//box1
			if(row >=0 &&row<=2 &&col>=0&&col<=2) {
				for (int i = 0; i<=2;i++) {
					for (int j =0; j<=2;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			
			//box2
			if(row >=3 &&row<=5 && col>=0&&col<=2) {
				for (int i = 3; i<=5;i++) {
					for (int j =0; j<=2;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box3
			if(row >=6 &&row<=8 &&col>=0&&col<=2) {
				for (int i = 6; i<=8;i++) {
					for (int j =0; j<=2;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			
			//box4
			if(row >=0 &&row<=2 &&col>=3&&col<=5) {
				for (int i = 0; i<=2;i++) {
					for (int j =3; j<=5;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box5
			if(row >=3 &&row<=5 &&col>=3&&col<=5) {
				for (int i = 3; i<=5;i++) {
					for (int j =3; j<=5;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box6
			if(row >=6 &&row<=8 &&col>=3&&col<=5) {
				for (int i = 6; i<=8;i++) {
					for (int j =3; j<=5;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box7
			if(row >=0 &&row<=2 &&col>=6&&col<=8) {
				for (int i = 0 ;i<=2;i++) {
					for (int j =6; j<=8;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box8
			if(row >=3 &&row<=5 &&col>=6&&col<=8) {
				for (int i = 3;i<=5;i++) {
					for (int j =6; j<=8;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			
			//box9
			if(row >=6 &&row<=8 &&col>=6&&col<=8) {
				for (int i = 6;i<=8;i++) {
					for (int j =6; j<=8;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
		 }
		
		if(sqrt ==4) {
			//box1
			if(row >=0 &&row<=3 &&col>=0&&col<=3) {
				for (int i = 0; i<=3;i++) {
					for (int j =0; j<=3;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			
			
			//box2
			if(row >=0 &&row<=3 &&col>=4&&col<=7) {
				for (int i = 0; i<=3;i++) {
					for (int j =4; j<=7;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box3
			if(row >=0 &&row<=3 &&col>=8&&col<=11) {
				for (int i = 0; i<=3;i++) {
					for (int j =8; j<=11;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box4
			if(row >=0 &&row<=3 &&col>=12&&col<=15) {
				for (int i = 0; i<=3;i++) {
					for (int j =12; j<=15;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box5
			if(row >=4 &&row<=7 &&col>=0&&col<=3) {
				for (int i = 4; i<=7;i++) {
					for (int j =0; j<=3;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box6
			if(row >=4 &&row<=7 &&col>=4&&col<=7) {
				for (int i = 4; i<=7;i++) {
					for (int j =4; j<=7;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box7
			if(row >=4 &&row<=7 &&col>=8&&col<=11) {
				for (int i = 4; i<=7;i++) {
					for (int j =8; j<=11;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box8
			if(row >=4 &&row<=7 &&col>=12&&col<=15) {
				for (int i = 4; i<=7;i++) {
					for (int j =12; j<=15;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box9
			if(row >=8 &&row<=11 &&col>=0&&col<=3) {
				for (int i = 8; i<=11;i++) {
					for (int j =0; j<=3;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box10
			if(row >=8 &&row<=11 &&col>=4&&col<=7) {
				for (int i = 8; i<=11;i++) {
					for (int j =4; j<=7;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box11
			if(row >=8 &&row<=11 &&col>=8&&col<=11) {
				for (int i = 8; i<=11;i++) {
					for (int j =8; j<=11;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box12
			if(row >=8 &&row<=11 &&col>=12&&col<=15) {
				for (int i = 8; i<=11;i++) {
					for (int j =12; j<=15;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box13
			if(row >=12 &&row<=15 &&col>=0&&col<=3) {
				for (int i = 12; i<=15;i++) {
					for (int j =0; j<=3;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box14
			if(row >=12 &&row<=15 &&col>=4&&col<=7) {
				for (int i = 12; i<=15;i++) {
					for (int j =4; j<=7;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box15
			if(row >=12 &&row<=15 &&col>=8&&col<=11) {
				for (int i = 12; i<=15;i++) {
					for (int j =8; j<=11;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box16
			if(row >=12 &&row<=15 &&col>=12&&col<=15) {
				for (int i = 12; i<=15;i++) {
					for (int j =12; j<=15;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
		}
		if(sqrt ==5) {
			//box1
			if(row >=0 &&row<=4 &&col>=0&&col<=4) {
				for (int i = 0; i<=4;i++) {
					for (int j =0; j<=4;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box2
			if(row >=0 &&row<=4 &&col>=5&&col<=9) {
				for (int i = 0; i<=4;i++) {
					for (int j =5; j<=9;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box3
			if(row >=0 &&row<=4 &&col>=10&&col<=14) {
				for (int i = 0; i<=4;i++) {
					for (int j =10; j<=14;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box4
			if(row >=0 &&row<=4 &&col>=15&&col<=19) {
				for (int i = 0; i<=4;i++) {
					for (int j =15; j<=19;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box5
			if(row >=0 &&row<=4 &&col>=20&&col<=24) {
				for (int i = 0; i<=4;i++) {
					for (int j =20; j<=24;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box6
			if(row >=5 &&row<=9 &&col>=0&&col<=4) {
				for (int i = 5; i<=9;i++) {
					for (int j =0; j<=4;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box7
			if(row >=5 &&row<=9 &&col>=5&&col<=9) {
				for (int i = 5; i<=9;i++) {
					for (int j =5; j<=9;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box8
			if(row >=5 &&row<=9 &&col>=10&&col<=14) {
				for (int i = 5; i<=9;i++) {
					for (int j =10; j<=14;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box9
			if(row >=5 &&row<=9 &&col>=15&&col<=19) {
				for (int i = 5; i<=9;i++) {
					for (int j =15; j<=19;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box10
			if(row >=5 &&row<=9 &&col>=20&&col<=24) {
				for (int i = 5; i<=9;i++) {
					for (int j =20; j<=24;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box11
			if(row >=10 &&row<=14 &&col>=0&&col<=4) {
				for (int i = 10; i<=14;i++) {
					for (int j =0; j<=4;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box12
			if(row >=10 &&row<=14 &&col>=5&&col<=9) {
				for (int i = 10; i<=14;i++) {
					for (int j =5; j<=9;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box13
			if(row >=10 &&row<=14 &&col>=10&&col<=14) {
				for (int i = 10; i<=14;i++) {
					for (int j =10; j<=14;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box14
			if(row >=10 &&row<=14 &&col>=15&&col<=19) {
				for (int i = 10; i<=14;i++) {
					for (int j =15; j<=19;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box15
			if(row >=10 &&row<=14 &&col>=20&&col<=24) {
				for (int i = 10; i<=14;i++) {
					for (int j =20; j<=24;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box16
			if(row >=15 &&row<=19 &&col>=0&&col<=4) {
				for (int i = 15; i<=19;i++) {
					for (int j =0; j<=4;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box17
			if(row >=15 &&row<=19 &&col>=5&col<=9) {
				for (int i = 15; i<=19;i++) {
					for (int j =5; j<=9;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box18
			if(row >=15 &&row<=19 &&col>=10&&col<=14) {
				for (int i = 15; i<=19;i++) {
					for (int j =10; j<=14;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box19
			if(row >=15 &&row<=19 &&col>=15&&col<=19) {
				for (int i = 15; i<=19;i++) {
					for (int j =15; j<=19;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box20
			if(row >=15 &&row<=19 &&col>=20&&col<=24) {
				for (int i = 15; i<=19;i++) {
					for (int j =20; j<=24;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box21
			if(row >=20 &&row<=24 &&col>=0&&col<=4) {
				for (int i = 20; i<=24;i++) {
					for (int j =0; j<=4;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box22
			if(row >=20 &&row<=24 &&col>=5&&col<=9) {
				for (int i = 20; i<=24;i++) {
					for (int j =5; j<=9;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box23
			if(row >=20 &&row<=24 &&col>=10&&col<=14) {
				for (int i = 20; i<=24;i++) {
					for (int j =10; j<=14;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box24
			if(row >=20 &&row<=24 &&col>=15&&col<=19) {
				for (int i = 20; i<=24;i++) {
					for (int j =15; j<=19;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
			//box25
			if(row >=20 &&row<=24 &&col>=20&&col<=24) {
				for (int i = 20; i<=24;i++) {
					for (int j =20; j<=24;j++) {
						if(board[i][j]==num){
							return false;
							}					
						}
					}
				}
		}
		//System.out.println(r);
		//System.out.println(c);
		//System.out.println("same in square");

		
		
		//check knight rule******************************
		if(knightRule) {
			int l = board.length;
			//possible moves
			//check by row+2
			if(row+2<l) {
				if(col-1>=0) {
					if(board[row+2][col-1]==num) {
						return false;
					}
				}
				if(col+1<l) {
					if(board[row+2][col+1]==num) {
						return false;
					}
				}
			}
			//check by row +1
			if(row+1<l) {
				if(col+2<l) {
					if(board[row+1][col+2]==num) {
						return false;
					}
				}
				if(col-2>=0) {
					if(board[row+1][col-2]==num) {
						return false;
					}
				}	
			}
			//check by row-2
			if(row-2>=0) {
				if(col+1<l) {
					if(board[row-2][col+1]==num) {
						return false;
					}
				}
				if(col-1>=0) {
					if(board[row-2][col-1]==num) {
						return false;
					}
				}	
			}
			//check by row -1
			if(row-1>=0) {
				if(col+2<l) {
					if(board[row-1][col+2]==num) {
						return false;
					}
				}
				if(col-2>=0) {
					if(board[row-1][col-2]==num) {
						return false;
					}
				}	
			}
		}
		
		//check king rule (only one in diagonal)
		if(kingRule) {
			if(row-1>=0) {
				if(col-1>=0) {
					if(board[row-1][col-1]==num) {
						return false;
					}
				}
				if(col+1<board.length) {
					if(board[row-1][col+1]==num) {
						return false;
					}
				}
			}
			if(row+1<board.length) {
				if(col-1>=0) {
					if(board[row+1][col-1]==num) {
						return false;
					}
				}
				if(col+1<board.length)
					if(board[row+1][col+1]==num) {
						return false;
						}
			}
		}
		
		
		//check queens rule (diagonal)**************
		//check by row below
		if(queenRule) {
			int max =board.length;
			if(num==max) {
			//upper left
			int count =1;
			//check upper gird
			while(row-count>=0) {
				if(col-count>=0) {
				if(board[row-count][col-count]==max) {
					return false;
				}}
				if(col+count<max) {
				if(board[row-count][col+count]==max) {
					return false;
				}}
				count++;
			}
			int index =1;
			//check lowwer gird
			while(row+index<max) {
				if(col+index<max) {
				if(board[row+index][col+index]==max) {
					return false;
				}}
				if(col-index>=0) {
				if(board[row+index][col-index]==max) {
					return false;
				}}
				index++;
			}
			
			}
			
		}
			
	return true;	
	}

	
	private boolean solveforone (ChessSudoku board) {
		//get row and col with 0 in it
		int row =-1;
		  int col =-1;
		  boolean isempty = true;
		  //check for empty 
		  for (int i=0; i<board.grid.length;i++){
		   for (int j =0; j<board.grid.length;j++) {
		    if (board.grid[i][j]==0) {
		     row =i;
		     col =j;

		     //System.out.println(row);
		     //System.out.println(col);
		     //System.out.println("one empty space");
		     isempty = false;
		     break;
		    }
		   }
		   if(!isempty) {
		    break;
		   }
		  }
		  
		  if(isdone(board.grid)) {
			  return true;
		  }
		  
		  for (int k =1; k < (board.grid.length+1); k++) {
			//System.out.println(k);
			//System.out.println(issafe(board.grid,row,col,k, board.knightRule,board.kingRule,board.queenRule));
			//if it is okay, solve next	
			if(issafe(board.grid,row,col,k, board.knightRule,board.kingRule,board.queenRule)) {
				board.grid[row][col]=k;
				//board.print();
				if(solveforone(board)) {
					return true;
				}
				else {
					board.grid[row][col]=0;
			     }
				}
			}
		 return false; 
	}
	
	private boolean solveformore(ChessSudoku board) {
		//get row and col with 0 in it
				int row =-1;
				  int col =-1;
				  boolean isempty = true;
				  //check for empty 
				  for (int i=0; i<board.grid.length;i++){
				   for (int j =0; j<board.grid.length;j++) {
				    if (board.grid[i][j]==0) {
				     row =i;
				     col =j;

				     //System.out.println(row);
				     //System.out.println(col);
				     //System.out.println("one empty space");
				     isempty = false;
				     break;
				    }
				   }
				   if(!isempty) {
				    break;
				   }
				  }
				  
				  if(isdone(board.grid)) {
					  ChessSudoku result = new ChessSudoku(this.SIZE);
					  int n = this.N;
					  result.grid= new int[n][n];
					  for (int x =0; x <board.grid.length; x++) {
						  for (int y =0; y <board.grid.length; y++) {
							result.grid[x][y]=board.grid[x][y];  
						  }
					  }
					  result.N=board.N;
					  result.SIZE=board.SIZE;
					  result.kingRule=board.kingRule;
					  result.knightRule=board.knightRule;
					  result.queenRule=board.queenRule;
					  board.solutions.add(result);
					  //result.print();
					  //System.out.println("one empty space");
					  //board.print();
					  //System.out.println("one empty space");
					  return false;
				  }
				  
				  for (int k =1; k < (board.grid.length+1); k++) {
					//System.out.println(k);
					//System.out.println(issafe(board.grid,row,col,k, board.knightRule,board.kingRule,board.queenRule));
					//if it is okay, solve next	
					if(issafe(board.grid,row,col,k, board.knightRule,board.kingRule,board.queenRule)) {
						board.grid[row][col]=k;
						//board.print();
						if(solveformore(board)) {
							return true;
						}
						else {
							board.grid[row][col]=0;
					     }
						}
					}
				 return false; 
		
		
		
	}
	/* The solve() method should remove all the unknown characters ('x') in the grid
	 * and replace them with the numbers in the correct range that satisfy the constraints
	 * of the Sudoku puzzle. If true is provided as input, the method should find finds ALL 
	 * possible solutions and store them in the field named solutions. */
	public void solve(boolean allSolutions) {
		  //if input was false, only one solutions:
		  if(!allSolutions) {
			  ChessSudoku result = new ChessSudoku(this.SIZE);
			  int n = this.N;
			  result.grid= new int[n][n];
			  for (int x =0; x <this.grid.length; x++) {
				  for (int y =0; y <this.grid.length; y++) {
					result.grid[x][y]=this.grid[x][y];  
				  }
			  }
			  result.N=this.N;
			  result.SIZE=this.SIZE;
			  result.kingRule=this.kingRule;
			  result.knightRule=this.knightRule;
			  result.queenRule=this.queenRule;
			  solveforone(result);
			  //result.print();
			  this.solutions.add(result);
			  this.grid=result.grid;
			  return;
		  }
		  //**************************************************************
		  //if input is true,case where there are multiple solutions
			//leaf case, just add
		  if(allSolutions){
			  ChessSudoku result = new ChessSudoku(this.SIZE);
			  int n = this.N;
			  result.grid= new int[n][n];
			  for (int x =0; x <this.grid.length; x++) {
				  for (int y =0; y <this.grid.length; y++) {
					result.grid[x][y]=this.grid[x][y];  
				  }
			  }
			  result.N=this.N;
			  result.SIZE=this.SIZE;
			  result.kingRule=this.kingRule;
			  result.knightRule=this.knightRule;
			  result.queenRule=this.queenRule;
			  solveformore(result);
			 this.solutions=result.solutions;
			 
			return;
		  }
		  
		  
		  
	}
	

	private boolean isdone(int[][] grid2) {
		boolean result = true;
		for (int i = 0; i < grid2.length; i++) {
			   for (int j =0; j<grid2.length; j++) {
			    if (grid2[i][j] ==0) {
				     //System.out.println(i);
				     //System.out.println(j);
			     result = false;
			     //System.out.println("one 0");
			    }
			   }
		}
	          //System.out.println(result);
			  return result;
	}


	/*****************************************************************************/
	/* NOTE: YOU SHOULD NOT HAVE TO MODIFY ANY OF THE METHODS BELOW THIS LINE. */
	/*****************************************************************************/

	/* Default constructor.  This will initialize all positions to the default 0
	 * value.  Use the read() function to load the Sudoku puzzle from a file or
	 * the standard input. */
	public ChessSudoku( int size ) {
		SIZE = size;
		N = size*size;

		grid = new int[N][N];
		for( int i = 0; i < N; i++ ) 
			for( int j = 0; j < N; j++ ) 
				grid[i][j] = 0;
	}


	/* readInteger is a helper function for the reading of the input file.  It reads
	 * words until it finds one that represents an integer. For convenience, it will also
	 * recognize the string "x" as equivalent to "0". */
	static int readInteger( InputStream in ) throws Exception {
		int result = 0;
		boolean success = false;

		while( !success ) {
			String word = readWord( in );

			try {
				result = Integer.parseInt( word );
				success = true;
			} catch( Exception e ) {
				// Convert 'x' words into 0's
				if( word.compareTo("x") == 0 ) {
					result = 0;
					success = true;
				}
				// Ignore all other words that are not integers
			}
		}

		return result;
	}


	/* readWord is a helper function that reads a word separated by white space. */
	static String readWord( InputStream in ) throws Exception {
		StringBuffer result = new StringBuffer();
		int currentChar = in.read();
		String whiteSpace = " \t\r\n";
		// Ignore any leading white space
		while( whiteSpace.indexOf(currentChar) > -1 ) {
			currentChar = in.read();
		}

		// Read all characters until you reach white space
		while( whiteSpace.indexOf(currentChar) == -1 ) {
			result.append( (char) currentChar );
			currentChar = in.read();
		}
		return result.toString();
	}


	/* This function reads a Sudoku puzzle from the input stream in.  The Sudoku
	 * grid is filled in one row at at time, from left to right.  All non-valid
	 * characters are ignored by this function and may be used in the Sudoku file
	 * to increase its legibility. */
	public void read( InputStream in ) throws Exception {
		for( int i = 0; i < N; i++ ) {
			for( int j = 0; j < N; j++ ) {
				grid[i][j] = readInteger( in );
			}
		}
	}


	/* Helper function for the printing of Sudoku puzzle.  This function will print
	 * out text, preceded by enough ' ' characters to make sure that the printint out
	 * takes at least width characters.  */
	void printFixedWidth( String text, int width ) {
		for( int i = 0; i < width - text.length(); i++ )
			System.out.print( " " );
		System.out.print( text );
	}


	/* The print() function outputs the Sudoku grid to the standard output, using
	 * a bit of extra formatting to make the result clearly readable. */
	public void print() {
		// Compute the number of digits necessary to print out each number in the Sudoku puzzle
		int digits = (int) Math.floor(Math.log(N) / Math.log(10)) + 1;

		// Create a dashed line to separate the boxes 
		int lineLength = (digits + 1) * N + 2 * SIZE - 3;
		StringBuffer line = new StringBuffer();
		for( int lineInit = 0; lineInit < lineLength; lineInit++ )
			line.append('-');

		// Go through the grid, printing out its values separated by spaces
		for( int i = 0; i < N; i++ ) {
			for( int j = 0; j < N; j++ ) {
				printFixedWidth( String.valueOf( grid[i][j] ), digits );
				// Print the vertical lines between boxes 
				if( (j < N-1) && ((j+1) % SIZE == 0) )
					System.out.print( " |" );
				System.out.print( " " );
			}
			System.out.println();

			// Print the horizontal line between boxes
			if( (i < N-1) && ((i+1) % SIZE == 0) )
				System.out.println( line.toString() );
		}
	}


	/* The main function reads in a Sudoku puzzle from the standard input, 
	 * unless a file name is provided as a run-time argument, in which case the
	 * Sudoku puzzle is loaded from that file.  It then solves the puzzle, and
	 * outputs the completed puzzle to the standard output. */
	public static void main( String args[] ) throws Exception {
		InputStream in = new FileInputStream("kingSudokuEasy3x3.txt");

		// The first number in all Sudoku files must represent the size of the puzzle.  See
		// the example files for the file format.
		int puzzleSize = readInteger( in );
		if( puzzleSize > 100 || puzzleSize < 1 ) {
			System.out.println("Error: The Sudoku puzzle size must be between 1 and 100.");
			System.exit(-1);
		}

		ChessSudoku s = new ChessSudoku( puzzleSize );
		
		// You can modify these to add rules to your sudoku
		s.knightRule = false;
		s.kingRule = true;
		s.queenRule = false;
		
		// read the rest of the Sudoku puzzle
		s.read( in );

		System.out.println("Before the solve:");
		s.print();
		System.out.println();

		// Solve the puzzle by finding one solution.
		s.solve(false);
		
		// Print out the (hopefully completed!) puzzle
		System.out.println("After the solve:");
		s.print();
	}
}

