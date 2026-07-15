

function debounce(func, wait, immediate = false) {

    let timeout;

    return function (...args) {

        const context = this;

        clearTimeout(timeout);

        const callNow = immediate && !timeout;

        timeout = setTimeout(() => {

            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }

        }, wait);
  //if user want to execute immediately the function on first key stroke this will get caled without delay
        if (callNow) {
            func.apply(context, args);
        }
    };
}