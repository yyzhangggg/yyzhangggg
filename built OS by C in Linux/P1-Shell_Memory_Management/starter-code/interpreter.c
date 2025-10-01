#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
#include <stdbool.h>//import bool
#include "shellmemory.h"
#include "shell.h"

//for my_ls
#include <sys/types.h>
#include <dirent.h>

//for my_touch
#include <fcntl.h>
#include <unistd.h>
#include <ctype.h>

//for my_cd
#include <sys/stat.h>
#include <errno.h>

#define MAX_PROGRAM_LINES 1000
#define MAX_SCRIPT_LINES 100
#define MAX_PROGRAMS 3

int MAX_ARGS_SIZE = 7;

int badcommand(){
    printf("Unknown Command\n");
    return 1;
}

int toomanytokens(){
    printf("Bad command: Too many tokens\n");
    return 1;
}

// For run command only
int badcommandFileDoesNotExist(){
    printf("Bad command: File not found\n");
    return 3;
}

typedef struct ExecThread {
    bool is_hashtag;
    bool is_MT;
} ExecThread;

int help();
int quit();
int set(char* var, char* value);
int print(char* var);
int run(char* script);
int badcommandFileDoesNotExist();
void echo(char* var);
void my_mkdir(char* dirname);
void my_ls();
void my_cd(const char* dirname);
void my_touch(const char* filename);
int exec(char *input, char *policy, ExecThread execthread);

// helper function to check if a string is alphanumeric
int is_alphanumeric(const char *str) {
    for (int i = 0; str[i] != '\0'; i++) {
        if (!isalnum(str[i])) {
            return 0;  // Not alphanumeric
        }
    }
    return 1;  // Alphanumeric
}

// make sure to change the badcommand for most stuff to toomanytokens!!!

int interpreter(char* command_args[], int args_size) {
    //store command args
    int i;
    
    if (args_size < 1) { 
        return badcommand();
    }

    if (args_size > MAX_ARGS_SIZE) {
        return toomanytokens();
    }

    for (i = 0; i < args_size; i++) { // terminate args at newlines
        command_args[i][strcspn(command_args[i], "\r\n")] = 0;
    }

    if (strcmp(command_args[0], "help") == 0){
        //help
        if (args_size != 1) return toomanytokens();
        return help();
    
    } else if (strcmp(command_args[0], "quit") == 0) {
        //quit
        if (args_size != 1) return toomanytokens();
        return quit();

    } else if (strcmp(command_args[0], "set") == 0) {
        // 1.2.1 Enhance set command

        // use buffer to contain all of value as one so that it can be stored in val
        char buffer[MAX_USER_INPUT] = "";
        for (i = 2; i < args_size; i++) { 
            if (is_alphanumeric(command_args[i]) == 0) return badcommand();

            strcat(buffer, command_args[i]);
            if (i < args_size - 1) {
                strcat(buffer, " ");
            }
        }

        if (args_size < 3) return badcommand();	
        return set(command_args[1], buffer); 
    
    } else if (strcmp(command_args[0], "print") == 0) {
        if (args_size != 2) return toomanytokens();
        return print(command_args[1]);
    
    } else if (strcmp(command_args[0], "run") == 0) {
        if (args_size != 2) return toomanytokens();
        return run(command_args[1]);
    
    } else if (strcmp(command_args[0], "echo") == 0) {
        if (args_size != 2) return toomanytokens();  // echo takes exactly one argument
        echo(command_args[1]);
        return 0;
    } else if (strcmp(command_args[0], "my_mkdir") == 0) {
        if (args_size != 2) return toomanytokens(); // my_mkdir takes one argument
        my_mkdir(command_args[1]);
    } else if (strcmp(command_args[0], "my_ls") == 0) {
        if (args_size != 1) return toomanytokens(); // my_ls takes no argument
        my_ls();
    } else if (strcmp(command_args[0], "my_cd") == 0) {
        if (args_size != 2) return toomanytokens();
        my_cd(command_args[1]);
    } else if (strcmp(command_args[0], "my_touch") == 0) {
        if (args_size != 2) return toomanytokens();
        my_touch(command_args[1]);
    } else if (strcmp(command_args[0], "exec") == 0) {
        // come back here to add # and MT
        // the last two can either be # or MT, if # is given then MT can be given but we cannot have an order of MT then #
        if (args_size > 7) return toomanytokens();
        int max_procs = args_size - 1;
        // defined a new data structure ExecThread to keep track of whether we give # and MT as options to exec command
        ExecThread execthread;
        execthread.is_hashtag = false;
        execthread.is_MT = false;
        char* policy = command_args[args_size - 1];
        if (strcmp(command_args[args_size - 1], "#") == 0) {
            max_procs = args_size - 2;
            policy = command_args[args_size - 2];
            execthread.is_hashtag = true;
        } 
        if (strcmp(command_args[args_size - 1], "MT") == 0) {
            if (strcmp(command_args[args_size - 2], "#") == 0) {
                max_procs = args_size - 3;
                policy = command_args[args_size - 3];
                execthread.is_hashtag = true;
                execthread.is_MT = true;
            } else {
                max_procs = args_size - 2;
                policy = command_args[args_size - 2];
                execthread.is_MT = true;
            }
        } 
        // use buffer to contain all programs 
        char buffer[MAX_USER_INPUT] = "";
        for (i = 1; i < max_procs; i++) { 
            strcat(buffer, command_args[i]);
            if (i < args_size - 2) {
                strcat(buffer, " ");
            }
        }
        if (args_size < 3) return badcommand();	// if at least one program and policy aren't given, return badcommand()
        return exec(buffer, policy, execthread); // give buffer which contains all programs and the policy to exec
    } else {badcommand();}
}

int help() {

    // note the literal tab characters here for alignment
    char help_string[] = "COMMAND			DESCRIPTION\n \
help			Displays all the commands\n \
quit			Exits / terminates the shell with “Bye!”\n \
set VAR STRING		Assigns a value to shell memory\n \
print VAR		Displays the STRING assigned to VAR\n \
run SCRIPT.TXT		Executes the file SCRIPT.TXT\n ";
    printf("%s\n", help_string);
    return 0;
}

int quit() {
    printf("Bye!\n");
    exit(0);
}

int set(char *var, char *value) {
    mem_set_value(var, value);
    return 0;
}

int print(char *var) {
    // changed mem_get_value to return NULL instead of print msg, so msg given here instead
    char *value = mem_get_value(var);
    if (value != NULL) printf("%s\n", value); 
    else {
        printf("Variable does not exist\n");
    }
    return 0;
}

int run(char *script) {
    
    FILE *p = fopen(script, "rt");  // the program is in a file
    extern ReadyQueue *taskreadyqueue; // get the external variable taskreadyqueue, which tracks ready tasks by order

    // If the file does not exist, return the corresponding error message
    if (p == NULL) {
        return badcommandFileDoesNotExist();
    }
    fclose(p);

    // Create the PCB for the corresponding program given to run as script
    PCB *new_pcb = create_pcb(script);
    if (new_pcb == NULL) {
        return -1; 
    }

    // Enqueue the new PCB corresponding to the script's process into the taskreadyqueue
    enqueue(taskreadyqueue, new_pcb);

    // Function call to scheduler, which will call parseInput() to parse lines of the program
    scheduler("FCFS");
    return 0; 
}

// 1.2.2 -- Implement "exec"

// Helper function for exec() to help check whether the programs given are identical
int has_duplicates(char *progs[], int count) {
    for (int i = 0; i < count; i++) {
        for (int j = i + 1; j < count; j++) {
            if (strcmp(progs[i], progs[j]) == 0) {
                return 1; // Duplicate found
            }
        }
    }
    return 0; // No duplicates
}

// enable process sharing!!!! 
// here, we need to load the scripts into the backing store; if the same process name is passed twice, it should be put into backing store only once!

// question: when the process is done, do we get rid of the script from the backing store??? i feel like this makes sense, because it can never be called again... BUT at the same time, what if the next process
// is the duplicate, and we want to still keep it? i guess it wont matter once it is in the frames or am i wrong?
// or do we delete from backing store once the session has ended? this probably makes more sense -- why?
// because what if theres shared memory by two processes? how do we know when to delete from backing store? we might be done with one but not with the other
// additionally, if we are using LRU policy, we may have gotten rid of those frames! 


// Note this convo between someone and the prof:
// Hi, according to the instructions, we shouldn't remove a process's frames when it finishes running. 
// Should we also not clear the frame store when an exec command finishes resolving (the queue becomes empty)?
// Prof: correct -- why is this? what does this mean? i dont really understand???? were my assumptions wrong?

// btw when is LRU used? is it after we know that the entire frame store is filled? probably, because otherwise we would never need it

int exec(char *input, char *policy, ExecThread execthread) {
    char *programs[MAX_PROGRAMS];
    int program_count = 0;
    extern ReadyQueue *taskreadyqueue; // get the external variable taskreadyqueue, which tracks ready tasks by order

    char *token = strtok(input, " "); // to separate the buffer given as input, which contains the program names separated by " " 
    while (token != NULL) {
        if (program_count < MAX_PROGRAMS) {
            programs[program_count++] = token; // store program names
        } else {
            break; // ignore extra tokens beyond MAX_PROGRAMS, which is defined above as 3
        }
        token = strtok(NULL, " ");
    }

    // Ensure that the policy given is a valid one! We only have FCFS, SJF, RR and AGING...
    if (strcmp(policy, "FCFS") != 0 && strcmp(policy, "SJF") != 0 && strcmp(policy, "RR") != 0 && strcmp(policy, "AGING") != 0 && strcmp(policy, "RR30") != 0 ) {
        fprintf(stderr, "Error: Invalid scheduling policy \n");
        return -1;
    }


    for (int i = 0; i < program_count; i++) {
        char *script = programs[i];

        FILE *p = fopen(script, "rt");  // the program is in a file

        // If file does not exist, return the corresponding error message
        if (p == NULL) {
            return badcommandFileDoesNotExist();
        }
        fclose(p);

        // Create PCB for corresponding program given to exec as script
        PCB *new_pcb = create_pcb(script);
        if (new_pcb == NULL) {
            return -1; 
        }
       
        // Enqueue new PCB corresponding to the script's process into taskreadyqueue
        enqueue(taskreadyqueue, new_pcb);
    }

    // Give policy as a argument to scheduler and let the scheduler deal with the different policies
    scheduler(policy);
    return 0;
}

// 1.2.2 Implement "echo" 
void echo(char *var) {
      // check if input starts with a '$'
    if (var[0] == '$') {
        // get variable name, which is everything after '$'
        char *var_name = var + 1;

        // check shell memory for the variable
        char *value = mem_get_value(var_name);

        if (value != NULL) {
            printf("%s\n", value); // variable found, print its value!
        } else {
            printf("\n"); // print empty line if variable not found
        }
    } else {
         // regular alphanumeric string, just print
        if (is_alphanumeric(var) == 1) printf("%s\n", var);
    }
}

// helper func for my_ls
int compare(const void *a, const void *b) {
    const char *str1 = *(const char **)a;
    const char *str2 = *(const char **)b;

    // case insensitive compare
    int result = strcasecmp(str1, str2);
    
    // check for the case lower/upper if they are equal case insensitively
    if (result == 0) {
        return strcmp(str1, str2); // sort uppercase before lowercase
    }
    
    return result; 
}

// 1.2.4 Implement my_ls

void my_ls() {
    DIR *d;
    struct dirent *dir;
    char *entries[1000];  // array to store the file/directory names to help with sorting
    int count = 0;

    // open the current directory
    d = opendir(".");
    if (d == NULL) {
        //printf("Error: Could not open current directory.\n");
        return;
    }
    // read each entry in the directory
    while ((dir = readdir(d)) != NULL) {
        if (dir->d_name[0] != '.') {  // ignore hidden files (starting with '.')
            entries[count] = strdup(dir->d_name);  // Duplicate name for storing
            count++;
        }
    }

    closedir(d);  // close directory after reading all entries

    // Sort the entries 
    qsort(entries, count, sizeof(char *), compare); // consider using isdigit and tolower instead maybe ?? thats what they have in the reference solution

    // Display the entries
    for (int i = 0; i < count; i++) {
        printf("%s\n", entries[i]);
        free(entries[i]);  // Free the duplicated string memory
    }
} 

// 1.2.4 Implement my_mkdir

void my_mkdir(char *dirname) {
    // are we trying to access a value from memory?
    if (dirname[0] == '$') {
        char *var_name = dirname + 1;
        char *value = mem_get_value(var_name);
        
        // check if this value actually exists
        if (value != NULL) {
            
            // is the value a single token or a string of tokens?
            int num_tokens = 1; 

            for (int i = 0; value[i] != '\0'; i++) {
                if (value[i] == ' ') {
                    num_tokens++;
                }
            }

            if (num_tokens > 1) {
                printf("Bad command: my_mkdir\n");
            } else {
                // create the directory
                if (mkdir(value, 0755) == -1) {
                    printf("Bad command: my_mkdir\n");
                }
            }
            
        } else {
            printf("Bad command: my_mkdir\n");
        }
    } else {
        // create the directory 
        if (is_alphanumeric(dirname) == 0) printf("Bad command: my_mkdir\n");
        if (mkdir(dirname, 0755) == -1) {
                    printf("Bad command: my_mkdir\n");
        }
    }
}

// 1.2.4 Implement my_touch -- create a new empty file
void my_touch(const char *filename) {
    // check if filename is alphanumeric
    if (!is_alphanumeric(filename)) {
        //printf("Error: Filename must be alphanumeric.\n");
        return;
    }

    // Create or open the file with read/write permissions
    int fd = open(filename, O_CREAT | O_WRONLY, 0644);
    if (fd == -1) {
        //perror("Error creating file");
        return;
    } else {
        //printf("File '%s' created successfully.\n", filename);
        close(fd);  // Close the file
    }
}


// 1.2.4 Implement my_cd: change the current directory
void my_cd(const char *dirname) {
    // check if dirname is alphanumeric
    if (!is_alphanumeric(dirname)) {
        printf("Bad command: my_cd\n");
        return;
    }

    // check if the directory exists by trying to change to it
    if (chdir(dirname) == 0) {
        return;
    } else {
        // failed to change directory
        printf("Bad command: my_cd\n");
    }
}