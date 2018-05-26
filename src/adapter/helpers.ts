/**
 * Creates a function that will Invoke the given functions
 * passing the return value on to the next function
 */
export const compose = (...fns) => fns.reduce((prevFn, nextFn) =>
    value => nextFn(prevFn(value)),
    value => value,
);
