console.log('1 - Sync');

setTimeout(() => {
  console.log('2 - Macrotask');
}, 0);

async function asyncFn() {
  console.log('3 - Inside Async');
  await Promise.resolve();
  console.log('4 - After Await');
}

asyncFn();

Promise.resolve().then(() => {
  console.log('5 - Microtask');
});

console.log('6 - Sync End');

// Output will be->

// 1
// 3
// 6
// 4
// 5
// 2

// explaination->

// - Javascript will first execute all synchronous task,
// So, 1 will be printed ->1
// - SetTimeout will be registred in macroTask Queue 
// - then async function will be called and 3 wil be printed as it is synchronous ->3
// and await get registred in microTask queue
// - then Promise also regsitred in micro task
// - 6 will be printed.. now all synchrounous work done-> 6
// - now JS engine will first check micro task.. and execute on the basis of first come first serve
// - 4 will be printed from await-> 4
// - 5 will be printed from Promise-> 5
// - now Js engine will check in Macro Task queue, and 2 will be printed-> 2
