export const compose = (...fns) => fns.reduce((prevFn, nextFn) =>
    value => nextFn(prevFn(value)),
    value => value,
);
