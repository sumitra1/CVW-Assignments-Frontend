const state = {
  user: { id: 101, details: { city: 'Bangalore' } },
  theme: 'dark'
};

const newState = {...state };
newState.user.details.city = 'Chennai';

console.log(state.user.details.city); 
// Expected output? Why did it change?

//beacuse spread operator does the shallow copy

//How to fix it?

// Create new copies for every nested object you want to modify.

const newState = {
    ...state,

    user: {
        ...state.user,

        details: {
            ...state.user.details,
            city: "Chennai"
        }
    }
};
// Copy every object along the path to the property you're changing. If you're changing state.user.details.city, then copy state, then user, then details, and finally update city. This avoids sharing nested object references.

// If details had more properties, for example:
// details: {
//     city: "Bangalore",
//     country: "India"
// }

// then

// details: {
//     ...state.user.details,
//     city: "Chennai"
// }

// becomes

// details: {
//     city: "Chennai",
//     country: "India"
// }

// Notice:

// country is copied.
// city is overwritten.


// Whenever you update a nested property, copy every level from the root to that property.

// Here the path is:

// state
//   ↓
// user
//   ↓
// details
//   ↓
// city

// So you copy:

// ...state          // Copy state
// ...state.user     // Copy user
// ...state.user.details // Copy details

// Then update the final property:

// city: "Chennai"