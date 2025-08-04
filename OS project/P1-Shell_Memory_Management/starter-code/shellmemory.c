#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <stdbool.h>
#include "shellmemory.h"
#include "shell.h"

struct memory_struct {
    char *var;
    char *value;
};

struct process_struct {
    char *line;
    bool frame_occupied;
    int last_access_time;
    int page_table_id; // add these to the helper fucntions !!!
    struct PCB* process_pcb; 
};

// Shellmemory is the variable store and program_lines is the frame store, and they will be set dynamically
struct memory_struct *shellmemory;
struct process_struct *program_lines; 

int framesize_num = FRAMESIZE;
int varmemsize_num = VARMEMSIZE;

// Helper functions

// Initialize the variable store and frame store dynamically according to framesize and varmemsize given to Makefile
void init_shell_memory(int framesize_num, int varmemsize_num) {
    shellmemory = malloc(sizeof(struct memory_struct) * varmemsize_num);
    program_lines = malloc(sizeof(struct process_struct) * framesize_num);

    if (!shellmemory || !program_lines) {
        fprintf(stderr, "Error allocating memory for shell memory \n");
        exit(1);
    }
}

int match(char *model, char *var) {
    int i, len = strlen(var), matchCount = 0;
    for (i = 0; i < len; i++) {
        if (model[i] == var[i]) matchCount++;
    }
    if (matchCount == len) {
        return 1;
    } else return 0;
}

// Shell memory functions

void mem_init(){
    int i;
    for (i = 0; i < varmemsize_num; i++){		
        shellmemory[i].var   = "none";
        shellmemory[i].value = "none";
    }
}

// Set key value pair
void mem_set_value(char *var_in, char *value_in) {
    int i;

    for (i = 0; i < varmemsize_num; i++){
        if (strcmp(shellmemory[i].var, var_in) == 0){
            shellmemory[i].value = strdup(value_in);
            return;
        } 
    }

    //Value does not exist, need to find a free spot.
    for (i = 0; i < varmemsize_num; i++){
        if (strcmp(shellmemory[i].var, "none") == 0){
            shellmemory[i].var   = strdup(var_in);
            shellmemory[i].value = strdup(value_in);
            return;
        } 
    }

    return;
}

//get value based on input key
char *mem_get_value(char *var_in) {
    int i;

    for (i = 0; i < varmemsize_num; i++){
        if (strcmp(shellmemory[i].var, var_in) == 0){
            return strdup(shellmemory[i].value);
        } 
    }
    return NULL;
}

// Functions to help with our new data structure process_struct which hold program lines

// Initialize program_lines array
int prog_mem_init() {
    for (int i = 0; i < framesize_num; i++) {
        program_lines[i].line = NULL;
        program_lines[i].frame_occupied = false;
        program_lines[i].last_access_time = -1;
        program_lines[i].page_table_id = -1;     // Use -1 to indicate an invalid page_table_id
        program_lines[i].process_pcb = NULL;
    }
    return 0;
}

// Global counter -- access_time_counter -- used in LRU
int access_time_counter = 0; 

// Finds free space for frames, returns the frame ID that is free!
int allocate_frame() {
    for (int i = 0; i < framesize_num; i += 3) {  // Check in steps of 3 for frames
        bool frame_free = true;

        for (int j = 0; j < 3; j++) {  // Check all 3 lines in the frame
            if (program_lines[i + j].frame_occupied) {
                frame_free = false;
                break;
            }
        }

        if (frame_free) {  // Found a free frame
            for (int j = 0; j < 3; j++) {
                program_lines[i + j].frame_occupied = true;  // Mark as occupied
                program_lines[i + j].last_access_time = access_time_counter++; 
            }
            return i / 3;  // Return the frame_id
        }
    }
    return -1;  // No free frame found
}


// Add a line to program memory
int prog_mem_add_line(char *line, int frame_id, int offset) {
    int id = frame_id * 3 + offset; // Calculate the actual index using frame size of 3

    if (id < 0 || id >= framesize_num) {
        return -1; // Out of bounds
    }

    if (!program_lines[id].frame_occupied) { 
        // Ensure line is part of an allocated frame
        return -2; 
    }

    if (program_lines[id].line != NULL) {
        free(program_lines[id].line); // Free previous line if it exists
    }

    program_lines[id].line = strdup(line);  // Allocate new line
    program_lines[id].last_access_time = access_time_counter++; 
    return 0;
}

// Get a line from program memory given frame_id and offset
// we know that a frame size is 3, thus to find the corresponding line from the frame store we need to multiply frame_id by 3
char *prog_mem_get_line(int frame_id, int offset) {
    int id = frame_id * 3 + offset; 

    if (id < 0 || id >= framesize_num) {
        return NULL; 
    }

    if (!program_lines[id].frame_occupied) { 
        // Ensure requested memory belongs to an allocated frame
        return NULL; 
    }

    program_lines[id].last_access_time = access_time_counter++;

    return program_lines[id].line; // Return line if it exists
}

// Free the program lines -- not necessary now that we free the frames! Was from the previous implementation
void prog_mem_free_lines(int start, int length) {
    for (int i = start; i < start + length && i < framesize_num; i++) {
        if (program_lines[i].line != NULL) {
            free(program_lines[i].line);
            program_lines[i].line = NULL;  // Set line to NULL to indicate free slot
        }
    }
}

// Helpers for LRU policy 
// To free frame according to a replacement policy! -- recall we will use LRU!
void free_frame(int frame_id) {
    for (int i = 0; i < 3; i++) {
        int index = frame_id * 3 + i;
        
        if (program_lines[index].frame_occupied) {
            // Free line if it exists inside the frame
            if (program_lines[index].line != NULL) {
                free(program_lines[index].line);
                program_lines[index].line = NULL; 
            }

            // Mark this frame as unoccupied, so it can be used in the future
            program_lines[index].frame_occupied = false;
            program_lines[index].last_access_time = -1;
        }
    }
}

// For page fault, when we replace a "victim frame", we want to print out the contents of the frame we are about to replace!
void print_frame(int frame_id) {
    for (int i = 0; i < 3; i++) {
        char *line = prog_mem_get_line(frame_id, i);  // Get the line at current offset

        // If the line exists inside the frame, then it will be printed out
        if (line != NULL) {
            printf("%s", line);  
        } 
    }
    printf("\n");
}

// Evicts a page according to LRU, by finding the frame that has the oldest access time
Replacement evict_page() {
    int lru_frame_id = -1;
    int oldest_access_time = access_time_counter;

    for (int i = 0; i < framesize_num; i += 3) {
        // Check if frame is occupied and whether the access time is older than the current oldest
        if (program_lines[i].frame_occupied && program_lines[i].last_access_time < oldest_access_time) {
            lru_frame_id = i / 3;  // update the LRU frame ID 
            oldest_access_time = program_lines[i].last_access_time;  
        }
    }

    Replacement replacement = {
        program_lines[lru_frame_id].process_pcb,
        program_lines[lru_frame_id].page_table_id,  // Page table ID of "victim" frame
        lru_frame_id                                // Victim Frame ID
    };

    return replacement;
}

// Update the process pcb and page table entry for the frame, important for when finding a victim frame
void update_process_page_id(struct PCB* pcb, int id) {
    int frame_id = pcb->page_table[id];  // Get frame ID for pcb's page table entry
    int frame_start = 3 * frame_id;  
            
    for (int j = 0; j < 3; j++) {
        int line_index = frame_start + j;  
        program_lines[line_index].process_pcb = pcb;  
        program_lines[line_index].page_table_id = id;  
    }
}
