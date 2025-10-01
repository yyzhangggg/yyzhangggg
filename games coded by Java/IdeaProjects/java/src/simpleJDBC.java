import java.sql.* ;
import java.util.Scanner;
import java.time.LocalDate;
class simpleJDBC {
    public static void main(String[] args) throws SQLException {

        // Unique table names.  Either the user supplies a unique identifier as a command line argument, or the program makes one up.
        String tableName = "";
        int sqlCode = 0;      // Variable to hold SQLCODE
        String sqlState = "00000";  // Variable to hold SQLSTATE

        if (args.length > 0)
            tableName += args[0];
        else
            tableName += "exampletbl";

        // Register the driver.  You must register the driver before you can use it.
        try {
            DriverManager.registerDriver(new com.ibm.db2.jcc.DB2Driver());
        } catch (Exception cnfe) {
            System.out.println("Class not found");
        }

        // This is the url you must use for DB2.
        //Note: This url may not valid now ! Check for the correct year and semester and server name.
        String url = "jdbc:db2://winter2023-comp421.cs.mcgill.ca:50000/cs421";

        //REMEMBER to remove your user id and password before submitting your code!!
        String your_userid = "cs421g158";
        String your_password = "927comp421";
        //AS AN ALTERNATIVE, you can just set your password in the shell environment in the Unix (as shown below) and read it from there.
        //$  export SOCSPASSWD=yoursocspasswd
        if (your_userid == null && (your_userid = System.getenv("SOCSUSER")) == null) {
            System.err.println("Error!! do not have a password to connect to the database!");
            System.exit(1);
        }
        if (your_password == null && (your_password = System.getenv("SOCSPASSWD")) == null) {
            System.err.println("Error!! do not have a password to connect to the database!");
            System.exit(1);
        }
        Connection con = DriverManager.getConnection(url, your_userid, your_password);
        Statement statement = con.createStatement();

        //question (a)-(i)
        try
        {
            String querySQL = "SELECT * from Matches;";
            System.out.println (querySQL) ;
            java.sql.ResultSet rs = statement.executeQuery ( querySQL ) ;

            while ( rs.next ( ) )
            {
                int id = rs.getInt ( 1 ) ;
                String date = rs.getString (2);
                String time = rs.getString(3);
                int totallenth = rs.getInt(4);
                String mround= rs.getNString(5);
                String stadium = rs.getString(6);
                System.out.println ("matchId:  " + id);
                System.out.println ("mDate:  " + date);
                System.out.println ("mTime:  " + time);
                System.out.println ("totalLength:  " + totallenth);
                System.out.println ("mRound:  " + mround);
                System.out.println ("stadium:  " + stadium);
            }
            System.out.println ("Question a (i)");
        }
        catch (SQLException e)
        {
            sqlCode = e.getErrorCode(); // Get SQLCODE
            sqlState = e.getSQLState(); // Get SQLSTATE

            // Your code to handle errors comes here;
            // something more meaningful than a print would be good
            System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
            System.out.println(e);
        }




        // Create a Scanner object
        boolean exit = false;
        int previous = 0;
        do {
            //get user's input
            Scanner myObj = new Scanner(System.in);
            String menu = "Soccer Main Menu\n" +
                    "1. List information of matches of a country\n" +
                    "2. Insert initial player information for a match\n" +
                    "3. List information of a player\n" +
                    "4. Exit application\n" +
                    "Please Enter Your Option in 1/2/3/4:";
            System.out.println(menu);
            int userchoice = myObj.nextInt();  // Read user input

            switch (userchoice) {
                case 1: {
                    Scanner myObj1 = new Scanner(System.in);  // Create a Scanner object
                    System.out.println("Please input the country name: ");  // Output user input
                    String country = myObj1.nextLine();
                    // Querying a table
                    try {
                        String table1 = "Teams";
                        String table2 = "TeaminMatch";
                        String table3 = "Matches";
                        String table4 ="Goal_ScorelineTeam";
                        String table5 = "Tickets";
                        String querySQL = "SELECT country, mDate, mRound, occurence, COUNT(ticketNumber) FROM " + table1 + "," + table2 +"," + table3 + ","+table4 + ","+table5+
                                " WHERE Teams.country = "+country +" AND Team.officialName = TeaminMatch.team AND TeaminMatch.matchId=Matches.matchId AND Matches.matchId=Goal_ScorelineTeam.matchId AND Matches.matchId = Tickets.matchId" +
                                " GROUP BY matchId;";
                        System.out.println(querySQL);
                        java.sql.ResultSet rs = statement.executeQuery(querySQL);
                        System.out.println(00000000000000);
                        while (rs.next()) {
                            String c = rs.getString(1);
                            String date = rs.getString(2);
                            System.out.println("country:" + c);
                            System.out.println("mDate:  " + date);
                        }
                    } catch (SQLException e) {
                        sqlCode = e.getErrorCode(); // Get SQLCODE
                        sqlState = e.getSQLState(); // Get SQLSTATE

                        // Your code to handle errors comes here;
                        // something more meaningful than a print would be good
                        System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
                        System.out.println(e);
                    }
                    break;
                }

                case 2: {
                    LocalDate date = LocalDate.now(); //creating a date information
                    LocalDate exact_time = date.minusDays(-3);//get 3 days after date
                    // Querying a table and represent the table show in next 3 days
                    try
                    {
                        String querySQL = "SELECT matchId, mDate, mRound from Matches WHERE mDate<=02/26/2022 AND mDate >=02/23/2022;2";
                        System.out.println (querySQL) ;
                        java.sql.ResultSet rs = statement.executeQuery ( querySQL ) ;

                        while ( rs.next ( ) )
                        {
                            int id = rs.getInt ( 1 ) ;
                            String name = rs.getString (2);
                            String date1 = rs.getString (3);
                            String round = rs.getString (4);
                            System.out.println ("match id:  " + id);
                            System.out.println ("country name:  " + name);
                            System.out.println ("mDate:  " + date1);
                            System.out.println ("mRound:  " + round);
                        }
                    }
                    catch (SQLException e)
                    {
                        sqlCode = e.getErrorCode(); // Get SQLCODE
                        sqlState = e.getSQLState(); // Get SQLSTATE

                        // Your code to handle errors comes here;
                        // something more meaningful than a print would be good
                        System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
                        System.out.println(e);
                    }
                    Scanner myObj2 = new Scanner(System.in);  // Create a Scanner object
                    System.out.println ("Select match identifer:");
                    int id = myObj2.nextInt();
                    Scanner myObj3 = new Scanner(System.in);  // Create a Scanner object
                    System.out.println ("Select country:");
                    String country = myObj3.nextLine();
                    // Querying a table
                    try
                    {
                        String querySQL = "SELECT name, shirtNb, generalPos from Players, TeamMembers, Teams, TeaminMatch WHERE TeamMembers.memberId= Players.playerId AND TeaminMatch.matchId= "+id +"AND Teams.country="+country+" AND Teams.officialName =TeamMemberinTeam.team;";
                        System.out.println (querySQL) ;
                        java.sql.ResultSet rs = statement.executeQuery ( querySQL ) ;

                        while ( rs.next ( ) )
                        {
                            String name = rs.getString ( 1 ) ;
                            int number = rs.getInt (2);
                            String position = rs.getString ( 3 ) ;
                            System.out.println ("player name:  " + name);
                            System.out.println ("shirtNB:  " + number);
                            System.out.println ("position:  " + position);
                        }
                        System.out.println ("the following player from"+country+"is already have in match"+id);
                    }
                    catch (SQLException e)
                    {
                        sqlCode = e.getErrorCode(); // Get SQLCODE
                        sqlState = e.getSQLState(); // Get SQLSTATE

                        // Your code to handle errors comes here;
                        // something more meaningful than a print would be good
                        System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
                        System.out.println(e);
                    }

                    Scanner myObj4 = new Scanner(System.in);  // Create a Scanner object
                    System.out.println("Please input the player id: ");  // Output user input
                    int player_id = myObj4.nextInt();
                    Scanner myObj5 = new Scanner(System.in);  // Create a Scanner object
                    System.out.println("Please input the player name: ");  // Output user input
                    String name = myObj5.nextLine();
                    // Creating a table
                    try {
                        String player_info = "playerinformation";
                        String createSQL = "CREATE TABLE " + player_info + " (id INTEGER, name VARCHAR (25)) ";
                        System.out.println(createSQL);
                        statement.executeUpdate(createSQL);
                        System.out.println("DONE");
                    } catch (SQLException e) {
                        sqlCode = e.getErrorCode(); // Get SQLCODE
                        sqlState = e.getSQLState(); // Get SQLSTATE

                        // Your code to handle errors comes here;
                        // something more meaningful than a print would be good
                        System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
                        System.out.println(e);
                    }
                    // Inserting Data into the table
                    try {
                        String insertSQL = "INSERT INTO playerinformation " + "VALUES("+player_id +","+ name+ ");";
                        System.out.println(insertSQL);
                        statement.executeUpdate(insertSQL);
                        System.out.println("DONE");

                    } catch (SQLException e) {
                        sqlCode = e.getErrorCode(); // Get SQLCODE
                        sqlState = e.getSQLState(); // Get SQLSTATE

                        // Your code to handle errors comes here;
                        // something more meaningful than a print would be good
                        System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
                        System.out.println(e);
                    }
                    break;
                }

                case 3: {
                    Scanner myObj3 = new Scanner(System.in);  // Create a Scanner object
                    System.out.println("Please input the player name: ");  // Output user input
                    String player = myObj3.nextLine();
                    // Querying a table
                    try
                    {
                        String querySQL = "SELECT playerId,shirtNb,generalPos from Players, TeamMebers WHERE memberID=playerID AND name="+player+";";
                        System.out.println (querySQL) ;
                        java.sql.ResultSet rs = statement.executeQuery ( querySQL ) ;

                        while ( rs.next ( ) )
                        {
                            int id = rs.getInt ( 1 ) ;
                            int shirt = rs.getInt ( 2 ) ;
                            String pos = rs.getString (3);
                            System.out.println ("player id:  " + id);
                            System.out.println ("shirt number:  " + shirt);
                            System.out.println ("position:  " + pos);
                        }
                        System.out.println ("DONE");
                    }
                    catch (SQLException e)
                    {
                        sqlCode = e.getErrorCode(); // Get SQLCODE
                        sqlState = e.getSQLState(); // Get SQLSTATE

                        // Your code to handle errors comes here;
                        // something more meaningful than a print would be good
                        System.out.println("Code: " + sqlCode + "  sqlState: " + sqlState);
                        System.out.println(e);
                    }
                break;
                }
                case 4:{
                    // Finally but importantly close the statement and connection
                    statement.close();
                    con.close();
                    exit = true;
                }

            }
        }
            while (exit != true ) ;

    }

}

