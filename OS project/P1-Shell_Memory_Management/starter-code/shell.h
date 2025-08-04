#define MAX_USER_INPUT 1000
int parseInput(char inp[]);


// Forward declaration of structs
typedef struct PCB {
   int pid;               // Process ID (unique for each process)
   char *filename;
   int proc_start;         // Start position of the script in the shell memory
   int proc_length;        // Length of the script in shell memory (number of instructions)
   int program_counter; // Current instruction index to execute
   int job_length_score; // Job length score, necessary for AGING policy
   struct PCB *next;      // Pointer to the next PCB in the ready queue
   int page_table[100]; // Page table for a process, stores frame number
} PCB;

typedef struct ReadyQueue ReadyQueue;  // Declare ReadyQueue struct

void enqueue(ReadyQueue *queue, PCB *pcb);
PCB* create_pcb(char *filename);
void scheduler();
void is_background(PCB *pcb);
void is_mt(PCB *pcb);