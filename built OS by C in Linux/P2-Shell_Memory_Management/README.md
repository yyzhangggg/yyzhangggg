Starter shell interface. The starter shell supports the following commands: 
COMMAND                     DESCRIPTION 
help                  | Displays all the commands 
quit                  | Exits / terminates the shell with “Bye!” 
set                   | VAR STRING Assigns a value to shell memory 
print                 | VAR Displays the STRING assigned to VAR 
run SCRIPT.TXT        | Executes the file SCRIPT.TXT 
echo Mary             | Return the value or the name based on mode
ls                    | lists all the files present in the current directory
mkdir name            | make dictionary
touch my_file         | creates a new empty file  inside the current directory
cd                    | changes  current directory to directory  dirname
exec                  | forks the shell and calls one of the flavors of exec to execute the given command

mainly it's about to do file management and built fault tolerance methods in file systems like Demand Paging, Shadow Paging, Journaling and Fault tolerant data storage like RAID.

More details in what i do and improve:
1. Enhanced set command:
Usually set can only take 2 tokens and set the token1 to be token2.
Extend the set command so it could be able to support values of at most 5 alphanumeric tokens. If the command has more 
than 5 tokens for the value, the shell will not set the new value and will return the error: “Bad command: 
Too many tokens”

2. Enhanced Echo command:
An  alphanumeric  string  preceded  by  $.  In  this  case,  echo  checks  the  shell  memory  for  a 
variable that has the name of the alphanumeric string following the $ symbol.  

3. Enhance batch mode execution
Batch mode execution in the shell enters an infinite loop if the last command in the input 
file is not quit. Fix this issue so the shell does not enter an infinite loop. Instead, the shell should 
display  the  mysh  command  prompt  (i.e.,  entering  interactive  mode)  after  running  all  the 
instructions in the input file. Also fix the problem of $ showns on every single line, enhanced the batch execution so that $ is only displayed in the interactive mode.

4. Build One-liners
A simple shell  only  supports  a  single  command  per  line.  This  is  not  the  case  for  regular  shells  where
multiple commands can be chained. So i implement a simple  chaining of instructions, where 
the shell can take as input multiple commands separated by semicolons (the ; symbol). 
Assumptions: 
• The instructions separated by semicolons are executed one after the other. 
• The total length of the combined instructions does not exceed 1000 characters. 
• There will be at most 10 chained instructions

5. Exec and Run with paging:
   -Add scaffolding for paging: Set up backing store, process sharing and partitioning the Shell memory by frame store and variable store load code to the frame table and create page table.
   -Design and implement demand paging by setting memory size with a compile time, load code and handling page faults.
   -Implement the LRU replacement policy in demand paging. 

