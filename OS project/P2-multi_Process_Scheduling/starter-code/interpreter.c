#include <stdio.h>
#include <stdlib.h>
#include <string.h> 
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
    }
    else {badcommand();}
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
    int errCode = 0;
    char line[MAX_USER_INPUT];
    FILE *p = fopen(script, "rt");  // the program is in a file

    if (p == NULL) {
        return badcommandFileDoesNotExist();
    }

    fgets(line, MAX_USER_INPUT-1, p);
    while (1) {
        errCode = parseInput(line);	// which calls interpreter()
        memset(line, 0, sizeof(line));

        if (feof(p)) {
            break;
        }
        fgets(line, MAX_USER_INPUT-1, p);
    }

    fclose(p);

    return errCode;
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