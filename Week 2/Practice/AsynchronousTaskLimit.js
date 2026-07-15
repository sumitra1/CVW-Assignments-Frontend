/**
 * @param {Array<() => Promise<any>>} tasks - Array of functions returning promises
 * @param {number} limit - Maximum concurrent executions
 */
async function promiseAllWithConcurrencyLimit(tasks, limit) {
  // TODO: Your implementation

  return new Promise((resolve, reject) => {
    let results = new Array(tasks.length);

    let currentRunningCount = 0;
    let nextRunIndex = 0;

    if (currentRunningCount == limit && nextRunIndex == tasks.length) {
      resolve(results);
      return;
    }
    function runNextTask(tasks, limit) {}
  });
}

// --- Input Data for Testing ---
const createDriverTask = (id, delay) => () =>
  new Promise((resolve) => {
    console.log(` Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(` Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });

const tasks = [
  createDriverTask(1, 1000),
  createDriverTask(2, 2000),
  createDriverTask(3, 3000),
  createDriverTask(4, 4000),
  createDriverTask(5, 5000),
];

// If limit is 2, Task 1 and 2 start.
// When Task 2 finishes at 0.5s, Task 3 starts immediately.
promiseAllWithConcurrencyLimit(tasks, 2).then((results) => {
  console.log("All tasks completed:", results);
});
