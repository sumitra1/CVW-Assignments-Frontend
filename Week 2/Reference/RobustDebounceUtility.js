function debounce(func, wait, immediate = false) {
  // Stores the timer id
  let timeout;

  // Return a new function (the debounced function)
  return function (...args) {
    // Save the current "this"
    const context = this;

    // If another event occurs before wait time,
    // cancel the previous timer.
    clearTimeout(timeout);

    // If immediate=true and no timer exists,
    // execute immediately.
    const callNow = immediate && !timeout;

    // Start a new timer.
    timeout = setTimeout(() => {
      // Reset timeout after execution.
      timeout = null;

      // For normal debounce (immediate=false),
      // execute after waiting.
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    // Execute immediately (leading debounce)
    if (callNow) {
      func.apply(context, args);
    }
  };
}
// This supports two behaviors:

// Trailing debounce (default): Execute after the delay.
// Leading debounce (immediate = true): Execute immediately on the first call, then ignore calls until the delay passes.

// immediate

// Checks whether the user wants the function to execute immediately.

// true → Run immediately on the first call.
// false → Wait for the delay before running.
// Usage in UI:
const onSearch = debounce(
  (e) => console.log("Searching for:", e.target.value),
  300,
);
// document.getElementById('search').addEventListener('input', onSearch);

// <!DOCTYPE html>
// <html>
// <body>

// <input id="search" placeholder="Search..." />

// <script src="index.js"></script>

// </body>
// </html>

//Debounce limits how frequently a function executes. Every time the returned function is called, it clears the previous timer and starts a new one. If another call happens before the delay ends, the old timer is cancelled. This ensures the original function executes only after there has been no activity for the specified wait time. func.apply(context, args) preserves the correct this value and forwards all arguments to the original function.

let counter = 0;
const getData = () => {
  console.log("fetching Data..", counter++);
};

function debounce(fn, delay) {
  let timer;

  return function () {
    let context = this,
      args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

const betterfunction = debounce(getData, 300);

<input type="text" onkeyup="betterfunction()"/>
// This works perfectly if the requirement is:

// "Run the function after the user stops typing."




// Memory trick

// Think of timeout as a "busy" sign.

// timeout = null → 🟢 Free to execute.
// timeout has a timer ID → 🔴 Already waiting, don't execute again.

// what difffernce it make to user, if we are executing immeditaly once imer finishes?

// Great question. The difference is **when the user sees the result**.

// Let's compare both behaviors.

// ---

// ## 1. `immediate = false` (Normal debounce)

// User types:

// ```text
// H
// He
// Hel
// Hell
// Hello
// ```

// Nothing happens while typing.

// After the user **stops typing for 300 ms**:

// ```text
// Searching: Hello
// ```

// **User experience:**

// * No immediate response.
// * Good for **search APIs**, auto-save, analytics, etc.

// ---

// ## 2. `immediate = true` (Leading debounce)

// User types the first character:

// ```text
// H
// ```

// Immediately:

// ```text
// Searching: H
// ```

// Then the user keeps typing:

// ```text
// He
// Hel
// Hell
// Hello
// ```

// Nothing else happens until the debounce period ends.

// If the user starts typing again **after the timer has finished**, the first keystroke of that new typing session runs immediately again.

// **User experience:**

// * Instant response on the first action.
// * Prevents repeated executions while the user continues interacting.

// ---

// ## Real-world example: Button click

// Imagine a **"Pay Now"** button.

// Without debounce:

// ```
// Click
// Click
// Click
// Click
// ```

// ➡️ Four payment requests ❌

// With `immediate = true`:

// ```
// First Click  → Payment starts ✅
// Next clicks  → Ignored
// ```

// This gives instant feedback and prevents duplicate actions.

// ---

// ## When to use which?

// * **`immediate = false`** → Search bars, auto-save, resize events (wait until the user is done).
// * **`immediate = true`** → Buttons like **Submit**, **Pay**, **Login**, where you want the first action to happen immediately but ignore repeated clicks for a short time.

// ### Interview takeaway

// > `immediate = false` delays execution until the user stops triggering the event. `immediate = true` executes the first event immediately, then suppresses additional calls until the debounce period ends. The choice depends on the desired user experience.
