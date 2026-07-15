const profile = {
  userName: 'Vasanth',
  greet: () => {
    console.log(`Hi, I'm ${this.userName}`);
  },
  welcome: function() {
    console.log(`Welcome, ${this.userName}`);
  }
};

const friend = { userName: 'Candidate' };

profile.greet.call(friend); 
profile.welcome.call(friend);

// Output will be 

// Hi, I'm undefined
// Welcome, Candidate


const person = {
  userName: "Vasanth",

  greet: function () {
    const sayHi = () => {
      console.log(this.userName);
    };

    return sayHi;
  }
};

const friend = {
  userName: "Candidate"
};

const fn = person.greet(); // arrow captures `this = person`

fn.call(friend); // Trying to change this

// output: Vasanth

// 1st explantion
// because Arrow function does not have their own this, it captured this when function created in execution context
// it captures this from it surronding lexcical scope
// call cant change it

// have to do this to assign global variable username
// one way->
// globalThis.userName = "Vasanth";

// const person = {
//   greet: () => {
//     console.log(this.userName);
//   }
// };

// person.greet();

//In modern JavaScript (especially ES modules), top-level this is often undefined, so relying on global this is discouraged.

// 2nd example concept->

// const person = {
//   userName: "Vasanth",

//   greet: function () {
//     const sayHi = () => {
//       console.log(this.userName);
//     };

//     return sayHi;
//   }
// };

// const friend = {
//   userName: "Candidate"
// };

// const fn = person.greet(); // arrow captures `this = person`

// fn.call(friend); // Trying to change this

// An arrow function doesn't have its own this. It captures the this of the surrounding function when it is created. 
// Once captured, call(), apply(), and bind() cannot change it.
// If you use only an arrow function, there is no object this to capture. That's why interviewers say:

// Arrow functions should not be used as object methods when you need this