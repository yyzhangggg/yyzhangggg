Main functions of MT:
1. Implement the scheduling infrastructure: - modify the run command to use the scheduler and run SCRIPT as a process
                                            - add a PCB to keep track of:  
                                                a. process PID
                                                b. spot  in  the  Shell  memory  where  you  loaded  the  SCRIPT  instructions 
                                                ( keep track of the start position and length of the script.  )
                                                c. current instruction to execute 
                                            - a Ready Queue and a Wait Queue
                                            - Implement scheduler logics : 
                                                a. The  scheduler  runs the  process  at  the  head of  the  ready  queue,  by  sending  the process’ current instruction to the interpreter. 
                                                b. The scheduler switches processes in and out of the ready queue, according to the scheduling policy FCFS.
                                            - cleaned up memory and next exec cmd.
2. Extend the exec to Executes up to 3 concurrent programs, according to a given scheduling policy, existing OS Shell syntax to create concurrent processes. 
3. Extend the scheduler to support the Shortest Job First (SJF) and Round Robin (RR) policies, SJF with job Aging.
4.  "#" option, excute in the backgroud(similar to the & command in the Linux  terminal).  If  exec  is  run  with  #,  exec  will  be  run  in  the  background  and  the  control  in  the  shell returns immediately to the batch script; the following instruction will be executed normally.
5. dd a new RR30 policy, where each process gets to run for 30 instructions before it is switched out. The rest of the implementation is identical to the RRm and note for this project, the multi-threaded (MT mode) will only be tested with RR and RR30 policy.
6. Created by pthreads library to create a pool of two worker threads.
 The two worker threads will handle the requests (i.e., programs that are ready to be run in the running queue), non-determinism in the output. Implement command MT to enanble multithreading at the end of exec and it remains enabled for the entire duration of the testcase (i.e. until the threads are terminated only when quit is called)