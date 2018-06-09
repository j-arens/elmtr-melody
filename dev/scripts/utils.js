const colors = require('./colors');
const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Create a taskrunner
 * @param {array} tasks
 * @return Object
 */
function makeTaskRunner(tasks) {
    let currentTask = 0;
    const next = (...args) => {
        if (currentTask < tasks.length) {
            tasks[currentTask++](next, ...args);
        }
    };
    return {
        run: (...args) => next(args),
    };
}

/**
 * Display error msg and log error, exit the process
 * @param {string} msg 
 */
function fatalError(msg = '', err) {
    const defaultMsg = 'A fatal error occurred!';
    console.log(colors.error(msg || defaultMsg));
    console.error(Error(err));
    process.exit(1);
}

/**
 * fs utils
 */
const paths = {
    exists: path => fs.existsSync(path),
    make: path => execSync(`mkdir ${path}`),
    clear: path => execSync(`rm -rf ${path}`),
};

module.exports = {
    makeTaskRunner,
    fatalError,
    paths,
};
