#include <stdio.h>
#include <stdlib.h>
#include <ctype.h> // isspace
#include <string.h>
#include <unistd.h> // isatty
#include <stdbool.h>//import bool
#include <pthread.h>//use when creating a thread
#include "shell.h"
#include "interpreter.h"
#include "shellmemory.h"

//declaer global constant numbers
#define THREAD_STACK_SIZE                  1024*64
#define MAX_THREADS                        32
//only 3 process could get in since max 4 argument and 1 is policy
#define MAX_PROCESSES                       3



int parseInput(char ui[]);

// Start of everything
int main(int argc, char *argv[]) {
    printf("Shell version 1.3 created September 2024\n");
    help();

    char prompt = '$';  				// Shell prompt
    char userInput[MAX_USER_INPUT];		// user's input stored here
    int errorCode = 0;					// zero means no error, default

    // from unistd.h docs
    int batch = !isatty(STDIN_FILENO);  // returns 0 if in batch mode (i.e. not connected to terminal, reading from file) and 1 if in interactive mode (i.e. connected to terminal) 

        //init user input
    for (int i = 0; i < MAX_USER_INPUT; i++) {
        userInput[i] = '\0';
    }
    
    //init shell memory
    mem_init();

    while (1) {
        // 1.2.3 Batch mode fix
        // from unistd library to only display $ in interactive mode
        if (!batch) {
            printf("%c ", prompt);
        }
        // if in batch mode and we reach the end of file, then quit
        if (fgets(userInput, MAX_USER_INPUT-1, stdin) == NULL) {
            exit(0);
        }

        errorCode = parseInput(userInput);
        if (errorCode == -1) exit(99);	// ignore all other errors
        memset(userInput, 0, sizeof(userInput));
    }

    return 0;
}

int wordEnding(char c) {
    // You may want to add ';' to this at some point,
    // or you may want to find a different way to implement chains.
    return c == '\0' || c == '\n' || c == ' ' || c == ';';
}

// 1.2.5 Implement one-liners
int parseInput(char inp[]) {
    char *commands[10];  // array to hold up to 10 commands separated by ";"
    char *command;
    int cidx = 0; // command index

    // split input by ";"
    command = strtok(inp, ";");
    
    while (command != NULL && cidx < 10) {
        commands[cidx] = strdup(command);  
        cidx++;
        command = strtok(NULL, ";");  // get next command
    }

    for (int i = 0; i < cidx; i++) {
        char tmp[200], *words[100];
        int w = 0, ix = 0, wordlen;

        while (commands[i][ix] == ' ') {
            ix++;
        }

        while (commands[i][ix] != '\n' && commands[i][ix] != '\0') {
            // extract word 
            for (wordlen = 0; !wordEnding(commands[i][ix]) && commands[i][ix] != '\0'; ix++, wordlen++) {
                tmp[wordlen] = commands[i][ix];
            }
            tmp[wordlen] = '\0'; 
            
            // store word in words array
            if (wordlen > 0) {
                words[w] = strdup(tmp);  
                w++;
            }

            if (commands[i][ix] == '\0') break; // reached end of command
            ix++; 
        }

        // execute command
        int errorCode = interpreter(words, w);
        if (errorCode == -1) {
            // Free words if there was an error
            for (int j = 0; j < w; j++) {
                free(words[j]);
            }
            // free memory alloc for command string
            free(commands[i]);
            return errorCode;  
        }

        // free allocated words after they are executed
        for (int j = 0; j < w; j++) {
            free(words[j]);
        }

        // free the memory allocated for commands before next input
        free(commands[i]);
    }

    return 0; 
}