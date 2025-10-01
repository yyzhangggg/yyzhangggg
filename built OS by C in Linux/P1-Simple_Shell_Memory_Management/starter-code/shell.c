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


// Only 3 processes
#define MAX_PROCESSES                      3

PCB* shared_page_tables[10] = { NULL }; // change number later ????

// Define `quit` as a global variable elsewhere in your code
extern bool quit;

//1.2.1 (3) -- Define the Queue data structure
// Define a structure for the a ReadyQueue containing each PCB
typedef struct ReadyQueue {
   PCB* head;              // record the head of the task ReadyQueue
   PCB* tail;
   bool is_empty;  // flag to keep track of whether or not the ReadyQueue is empty; important in our implementation in scheduler to know we do not have any more processes ready to be processed
   pthread_mutex_t lock;
   pthread_cond_t cond;
} ReadyQueue;


// initial global queue: TASK READY QUEUE
ReadyQueue *taskreadyqueue;                 


int parseInput(char ui[]);
void init_queue();


// Start of everything
int main(int argc, char *argv[]) {

   int framesize_num = FRAMESIZE;
   int varmemsize_num = VARMEMSIZE;
   
   printf("Frame Store Size = %d; Variable Store Size = %d\n", framesize_num, varmemsize_num);

   init_shell_memory(framesize_num, varmemsize_num);

   // Initialize the taskreadyqueue
   taskreadyqueue = (ReadyQueue*)malloc(sizeof(ReadyQueue));
   init_queue(taskreadyqueue);


   char prompt = '$';                  // Shell prompt
   char userInput[MAX_USER_INPUT];     // user's input stored here
   int errorCode = 0;                  // zero means no error, default


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
       if (!batch) printf("%c ", prompt);

       // if in batch mode and we reach the end of file, then quit
       if (fgets(userInput, MAX_USER_INPUT-1, stdin) == NULL) exit(0);

       errorCode = parseInput(userInput);
       if (errorCode == -1) exit(99);  // ignore all other errors
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
   char *command_copy = strdup(inp);
   command = strtok(command_copy, ";");
  
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

//1.2.1 (2) -- PCB

// struct Script to keep track of start of the script in the process memory i.e. the program_lines array and the line count and page table!
// may not need start anymore actually.....
typedef struct Script {
   int start;
   int count;
   int page_table[100];
} Script;

// 1.2.1 (1) -- Loading the script

// After the initial two pages are loaded, the pages are loaded one by one per demand -- demand paging
void load_page(char *filename, int page_id, int frame_id) {

    // If we are trying to access a page, we must be on the (page_id * 3)th line 
    FILE *file = fopen(filename, "r");
    int start_line = page_id * 3;

    char line[100];
    for (int i = 0; i < start_line; i++) {
        fgets(line, sizeof(line), file);
    }

    int lines_to_read = 3;
    for (int i = 0; i < lines_to_read; i++) {
        if (fgets(line, sizeof(line), file) != NULL) {
            // Add the line to the allocated frame if there is another line, if there are less than 3 lines left in the script, the frame will only include that many lines, not all lines in frame will be occupied! 
            if (prog_mem_add_line(line, frame_id, i) == -1) {
                fclose(file);
                return;
            }
        }
    }

    fclose(file);
}

// Used to load the script into the program_lines array
Script load_script(char *filename) {
   Script script;
   FILE *file = fopen(filename, "r"); // open the file with filename as the script
   if (file == NULL) {
       script.start = -1;
       script.count = 0;
       return script;
   }

   // in order to know how much space we need to allocate, we need to count the number of lines in the script
   int line_count = 0;
   char line[100];
  
   while (fgets(line, sizeof(line), file) != NULL) {
       line_count++;
   }

   rewind(file);
   int num_pages = (line_count + 2) / 3;  // add 2 to round up if there aren't a multiple of 3 numbers of line in the script! we still need to occupy a whole frame, even if theres a single line or 2 lines left
   int num_frames = (line_count <= 3) ? 1 : 2;
   //printf("Number of frames %d, ", num_frames);
   
   int start = -1;
   int total_lines_allocated = 0;
   // Initialize page_table
   
   for (int i = 0; i < 100; i++) {
     script.page_table[i] = -1;  // Set all entries to -1 (no frame allocated)
   }
   // allocate frames for the script
   for (int i = 0; i < num_frames; i++) {
        int frame_id = allocate_frame();  // Try to allocate a free frame for this part of the script
        
        if (frame_id == -1) {
            fclose(file);
            script.start = -2;  // Frame allocation has failed
            script.count = 0;
            return script;
        }

        script.page_table[i] = frame_id;

        // If it's the first frame, set the start position
        if (start == -1) {
            start = frame_id * 3;
        }

        load_page(filename, i, frame_id);
    }

    fclose(file);
    script.start = start;  // Set the start position of the script in the allocated frames
    script.count = line_count; // Set the line count

    return script;
}

// in order to keep track of a unique process id, define last_pid which will be incremented when assigned each time a new PCB is created
static int last_pid = 0;

// initial function to create a new PCB for a process
PCB* create_pcb(char *filename) {
   PCB* new_pcb = (PCB*)malloc(sizeof(PCB)); // allocate memory for the PCB

   // To check whether or not this process has been called already, so we can share memory, even though we create a new PCB!
   for (int i = 0; i < 10; i++) {
        if (shared_page_tables[i] != NULL && strcmp(shared_page_tables[i]->filename, filename) == 0) {
            // Script has already been loaded, reuse its memory and page table
            PCB* existing_pcb = shared_page_tables[i];
            if (new_pcb == NULL) {
                printf("Memory allocation for PCB failed. \n");
                return NULL;
            }

            // Reuse the existing page table and other info from existing PCB
            new_pcb->pid = ++last_pid;                  
            new_pcb->filename = strdup(filename); 
            new_pcb->proc_start = existing_pcb->proc_start;  // Reuse start position 
            new_pcb->proc_length = existing_pcb->proc_length; // Reuse script length
            new_pcb->program_counter = 0;                 
            new_pcb->job_length_score = existing_pcb->job_length_score; // Reuse job length score
            new_pcb->next = NULL;                        

            // Share the page table from the existing PCB

            for (int i = 0; i < 100; i++) {
                new_pcb->page_table[i] = existing_pcb->page_table[i];

                // set program & page table ID for the frame, so it is easy to track later for demand paging
                if (new_pcb->page_table[i] != -1) {
                    update_process_page_id(new_pcb, i);
                }
            }

            return new_pcb;
        }
    }

   // error handle for fail to malloc space
   if (new_pcb == NULL) {
       printf("Memory allocation for PCB failed. \n");
       return NULL;
   }

   Script script = load_script(filename);
   if (script.start < 0) {
       printf("Failed to load script '%s': error code %d\n", filename, script.start);
       free(new_pcb);
       return NULL;
   }

   // Initialize the PCB fields
   new_pcb->pid = ++last_pid;                  // Assign unique process ID
   new_pcb->filename = strdup(filename);
   new_pcb->proc_start = script.start;          // Store process memory start position from load_script
   new_pcb->proc_length = script.count;    // Store length of loaded script (i.e. line count)
   new_pcb->program_counter = 0;        // Set program counter to 0 (start of script)
   new_pcb->job_length_score = script.count; // Set job length score as length initially
   new_pcb->next = NULL;   // Initialize the next PCB pointer
   for (int i = 0; i < 100; i++) {
        new_pcb->page_table[i] = script.page_table[i];

        // set program & page table ID for the frame, so it is easy to track later for demand paging
        if (new_pcb->page_table[i] != -1) {
            update_process_page_id(new_pcb, i);
        }
    }

    // save the pcb for potential future sharing of data
    for (int i = 0; i < 10; i++) { // number may change ???? depends on if we change size of the array
        if (shared_page_tables[i] == NULL) {
            shared_page_tables[i] = new_pcb; 
            break;
        }
    }

   return new_pcb;
}

// Function to clean up the PCB and release memory

void cleanup(PCB *pcb) {
   int start_id = pcb->proc_start;
   int program_counter = pcb->program_counter;
   //free(pcb);                       // Free the space of PCB
   // not sure if this is what needs to be done...
   prog_mem_free_lines(start_id, program_counter); // Free space in process memory log
}


// Initialize a ReadyQueue
void init_queue(ReadyQueue* ready_queue) {
   ready_queue->head = NULL;
   ready_queue->tail = NULL;
   ready_queue->is_empty = true;
   // Initialize the mutex and condition variable
   if (pthread_mutex_init(&ready_queue->lock, NULL) != 0) {
       perror("Failed to initialize mutex");
       exit(1);
   }
   if (pthread_cond_init(&ready_queue->cond, NULL) != 0) {
       perror("Failed to initialize condition variable");
       exit(1);
   }
}

// Helpers function to the ReadyQueue structures
// Function to enqueue (add) a PCB to the queue
void enqueue(ReadyQueue *queue, PCB *pcb) {
   if (queue->head == NULL) {
       // If the queue is empty, both head and tail point to the new PCB
       queue->head = pcb;
       queue->tail = pcb;
       queue->is_empty = false;
       queue->tail->next = NULL;
   } else {
       // Otherwise, add the PCB to the end of the queue and update the tail
       queue->tail->next = pcb;
       queue->tail = pcb;
       queue->tail->next = NULL;
   }
}

// Function to dequeue (remove) a PCB from the front of a queue and return the PCB that has been removed
// Particularly useful for FCFS
PCB* dequeue(ReadyQueue *queue) {
   if (queue->head == NULL) {
       // Queue is empty
       printf("Queue is empty!\n");
       return NULL;  // Return NULL if queue is empty
   }

   // Get first PCB from queue
   PCB *pcb = queue->head;

   // Let the head be the next PCB in queue
   queue->head = queue->head->next;

   // If the head becomes NULL, the queue is empty after deleting, so update the tail to NULL
   if (queue->head == NULL) {
       queue->tail = NULL;  // No more elements, tail should also be NULL
       queue->is_empty = true;  // Mark queue as empty
   } else {
       queue->is_empty = false;  // Still elements in the queue
   }

   // Return removed PCB
   return pcb;
}

// 1.2.1 (4) -- Implementing the scheduler

// Need to do parseInput(line from program_line array corresponding to that PCB) in order to execute each line

// Helper functions for "SJF" to sort the ReadyQueue
// Insert a PCB into a sorted queue based on proc_length in ascending order
PCB* sort_pcb(PCB* sorted, PCB* new_pcb) {
   if (sorted == NULL || new_pcb->proc_length < sorted->proc_length) {
       new_pcb->next = sorted; // new_pcb length is less than sorted pcb length
       return new_pcb;
   }
  
   PCB* current = sorted;
   while (current->next != NULL && current->next->proc_length <= new_pcb->proc_length) {
       current = current->next; // in order to find the correct position for new_pcb, we continue the loop until the first pcb which has length greater than new_pcb
   }
   new_pcb->next = current->next;
   current->next = new_pcb;
   return sorted;
}

// Sort the ready queue
ReadyQueue* sortReadyQueue(ReadyQueue* queue) {
   if (queue->is_empty) return queue;

   // allocate memory and initialize a "sorted_queue" to store the sorted version of the queue
   ReadyQueue* sorted_queue = (ReadyQueue*)malloc(sizeof(ReadyQueue));
   init_queue(sorted_queue);

   PCB* sorted_head = NULL;
  
   // we will sort the queue until it is empty
   while (!queue->is_empty) {
       PCB* pcb = dequeue(queue);
       sorted_head = sort_pcb(sorted_head, pcb);
   }

   // rebuild sorted_queue from sorted_head
   sorted_queue->head = sorted_head;
   PCB* temp = sorted_head;
   while (temp != NULL && temp->next != NULL) {
       temp = temp->next;
   }
   sorted_queue->tail = temp;
   sorted_queue->is_empty = (sorted_queue->head == NULL);
   return sorted_queue; // sorted queue is the queue we will use for SJF
}

// Helper function for AGING policy to age the processes
void age(ReadyQueue* queue) {
   if (queue->is_empty) {
       return;
   }

   PCB* current = queue->head;
   while (current != NULL) {
       //printf("Current PCB: %p, Job Length Score: %d\n", current, current->job_length_score);
       current->job_length_score = current->job_length_score > 0 ? current->job_length_score - 1 : 0;  // age the job length score by 1
       current = current->next;         // move to the next PCB in the taskreadyqueue
   }
}

// Helper function for AGING policy to find the lowest job_length_score
PCB* lowest_joblen(ReadyQueue* queue) {
   if (queue->is_empty) {
       return NULL; // Return NULL if the queue is empty
   }

   PCB* current = queue->head;
   PCB* lowest = current;

   // Go through the entire ReadyQueue
   while (current != NULL) {
       // Check if current PCB has a lower job_length_score than the current lowest
       if (current->job_length_score < lowest->job_length_score) {
           lowest = current;
       }
       current = current->next; // Move to next PCB
   }
   return lowest;
}

// 1.2.2 - Demand Paging: the following functions are to help in implementing demand paging

// For demand paging, we will handle a page fault either by replacing a frame or finding an empty slot and loading the page!
int handle_page_fault(PCB* pcb, int page_id) {
    // Need to check if there is a free frame somewhere to allocate
    int frame_id = allocate_frame();  
    if (frame_id == -1) {
        // If there's no available frame, we need to evict a page from memory!! -- use LRU
        Replacement replacement = evict_page();
        int victim_frame = replacement.frame_id;
        int victim_page_id = replacement.page_table_id;
        PCB* process_pcb = replacement.process_pcb;
        printf("Page fault! Victim page contents:\n\n");
        print_frame(victim_frame);  
        printf("End of victim page contents.\n");

        // Evict the victim page and free its memory -- need to set the corresponding page table entry to invalid from the relevant process
        free_frame(victim_frame);
        process_pcb->page_table[victim_page_id] = -1; 
        frame_id = allocate_frame();
        
    } else {
        printf("Page fault!\n");
    }

    load_page(pcb->filename, page_id, frame_id); 
    return frame_id;
}

// By default, will run FCFS unless a different policy is given!
void scheduler(char *policy) {
   // shortest job first -- we keep track of the length of the job in our PCB data structure, so we can compare them and sort accordingly
   if (strcmp(policy, "SJF") == 0) taskreadyqueue = sortReadyQueue(taskreadyqueue);
   if (strcmp(policy, "AGING") == 0) taskreadyqueue = sortReadyQueue(taskreadyqueue);

   while (taskreadyqueue->is_empty == false) {
       PCB *pcb = dequeue(taskreadyqueue);
       // check if it's NULL; if empty exit the while loop
       if (pcb == NULL) {
           taskreadyqueue->is_empty = true; // the taskreadyqueue must be empty since it does not have any PCB in it
           break;
       }

       int start_index = pcb->proc_start;
       int prog_length = pcb->proc_length; 
       int prog_counter = pcb->program_counter;
       int line_count = prog_length;

       // For RR, each process gets to run 2 lines before swtiching to the next!
       if (strcmp(policy, "RR") == 0) line_count = 2;
       if (strcmp(policy, "RR30") == 0) line_count = 30;

       int i;
       int j;

       // If there is only one process left in the taskreadyqueue, then we can just execute all the lines left
       if (pcb->next == pcb) {
           line_count = prog_length - prog_counter;
           taskreadyqueue->is_empty = true;
       }
          
       int instructions_executed = 0;  // Track how many instructions we've executed in this time slice
        while (prog_counter < prog_length && instructions_executed < line_count) {
            // printf("instructions executed %d", instructions_executed);
            // printf("prog_length %d", prog_length);
            //printf("pid: %d\n", pcb->pid);
            int page_id = prog_counter / 3;
            int offset = prog_counter % 3;

            // Get frame ID from page table
            int frame_id = pcb->page_table[page_id];

            // Handle page fault if frame is invalid (-1)
            if (frame_id == -1) {
                frame_id = handle_page_fault(pcb, page_id);
                if (frame_id == -1) {
                    // This means no frames are available or eviction failed
                    // Possibly stuck here
                    break;
                }
                pcb->page_table[page_id] = frame_id;

                // Re-queue the process after a page fault and switch to the next process
                enqueue(taskreadyqueue, pcb);
                break;
            }

            // Get the instruction line from the memory
            char *line = prog_mem_get_line(frame_id, offset);
            if (line == NULL) {
                fprintf(stderr, "Error: NULL line at program counter %d\n", prog_counter);
                break;
            }

            // Execute the instruction
            int errcode = parseInput(line);
            if (errcode != 0) {
                fprintf(stderr, "Error executing line at program counter %d: %d\n", prog_counter, errcode);
                break;
            }

            prog_counter++;          // Move to the next instruction
            instructions_executed++; // Track the number of instructions executed
        }

       pcb->program_counter = prog_counter;

       // If the program counter is less than the program length, this indicates that the end of the process has not yet been reached!
       // this can happen with RR policy, as we are executing 2 lines per process before switching
       // thus, we need to enqueue the process back into our taskreadyqueue to be processed after all prior processes have 2 lines executed!
       if (prog_counter < prog_length) {
           enqueue(taskreadyqueue, pcb);
       }
   }
}