#define MEM_SIZE 1000
extern int access_time_counter;

typedef struct Replacement {
    struct PCB* process_pcb;
    int page_table_id;
    int frame_id;
} Replacement;

void init_shell_memory(int framesize_num, int varmemsize_num);
void mem_init();
char *mem_get_value(char *var);
void mem_set_value(char *var, char *value);

int allocate_frame();
int prog_mem_add_line(char *line, int frame_id, int offset);
char *prog_mem_get_line(int frame_id, int offset);
void prog_mem_free_lines(int start, int length);
void print_frame(int frame_id);
void free_frame(int frame_id);
Replacement evict_page();
void update_process_page_id(struct PCB* pcb, int id);