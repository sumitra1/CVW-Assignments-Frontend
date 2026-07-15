async function promiseAllWithConcurrencyLimit(tasks, limit) {

    // Stores the result of each task in the same order as the input array.
    // Even if Task 3 finishes before Task 1, we'll save it at index 2.
    const results = new Array(tasks.length);

    // Points to the next task waiting to be started.
    // Initially points to the first task (index 0).
    let nextTaskIndex = 0;

    // Tracks how many tasks are currently running.
    // This ensures we never exceed the concurrency limit.
    let runningTasks = 0;

    // Return a Promise because this function should complete
    // only after ALL tasks have finished.
    return new Promise((resolve, reject) => {

        // Helper function to start new tasks whenever a slot becomes free.
        function runNextTask() {

            // Base case:
            // If all tasks have been started AND no tasks are running,
            // then every task has completed.
            if (nextTaskIndex === tasks.length && runningTasks === 0) {
                resolve(results);
                return;
            }

            // Start tasks until:
            // 1. We reach the concurrency limit OR
            // 2. There are no more tasks left to start.
            while (runningTasks < limit && nextTaskIndex < tasks.length) {

                // Save the current task's index because nextTaskIndex
                // will change immediately after this.
                const currentIndex = nextTaskIndex;

                // Move the pointer to the next waiting task.
                nextTaskIndex++;

                // One more task is now running.
                runningTasks++;

                // Start the current task.
                tasks[currentIndex]()

                    // Task completed successfully.
                    .then(result => {

                        // Save the result at its original index.
                        results[currentIndex] = result;
                    })

                    // If any task fails, reject the entire Promise.
                    .catch(reject)

                    // Runs whether the task succeeds or fails.
                    .finally(() => {

                        // This task is no longer running.
                        runningTasks--;

                        // Since one slot became free,
                        // try to start the next waiting task.
                        runNextTask();
                    });
            }
        }

        // Start the first batch of tasks.
        runNextTask();
    });
}

const createDriverTask = (id, delay) => () => 
  new Promise((resolve) => {
    console.log(` Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(` Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });

//created tasks with id and time
const tasks =[
createDriverTask(1,1000),
createDriverTask(2,2000),
createDriverTask(3,3000),
createDriverTask(4,4000),
createDriverTask(5,5000)]

// If limit is 2, Task 1 and 2 start. 
// When Task 2 finishes at 0.5s, Task 3 starts immediately.
promiseAllWithConcurrencyLimit(tasks, 2).then(results => {
  console.log("All tasks completed:", results);
});