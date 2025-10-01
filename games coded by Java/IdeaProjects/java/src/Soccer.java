import java.util.Scanner;  // Import the Scanner class

public class Soccer {
    class Main {
        public static void main(String[] args) {
            Scanner myObj = new Scanner(System.in);  // Create a Scanner object
            System.out.println("Soccer Main Menu\n" +
                    "1. List information of matches of a country\n" +
                    "2. Insert initial player information for a match\n" +
                    "3. List information of a player\n" +
                    "4. Exit application\n" +
                    "Please Enter Your Option in 1/2/3/4:");

            String userchoice = myObj.nextLine();  // Read user input
            if(userchoice.equals('1')){
                Scanner myObj1 = new Scanner(System.in);  // Create a Scanner object
                System.out.println("Please input the country name: " );  // Output user input
                String country = myObj1.nextLine();

            }
            if(userchoice.equals('2')){
                Scanner myObj2 = new Scanner(System.in);  // Create a Scanner object
                System.out.println("Please input the player information: " );  // Output user input
                String player = myObj2.nextLine();

            }
            if(userchoice.equals('3')){
                Scanner myObj3 = new Scanner(System.in);  // Create a Scanner object
                System.out.println("Please input the palyer name: " );  // Output user input
                String name = myObj3.nextLine();


            }
        }
    }


}
