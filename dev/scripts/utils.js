const colors = require('./colors');
const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Create a taskrunner iterable
 * @param {array} tasks
 * @return Iterable
 */
function makeTaskRunner(tasks) {
    let currentTask = 0;
    const next = (...args) => {
        if (currentTask < tasks.length) {
            tasks[currentTask++](...args);
        }
    };
    return { next };
}

/**
 * Display error msg and log error, exit the process
 * @param {string} msg 
 */
function fatalProcessError(msg = '') {
    const defaultMsg = 'fatal error occured while trying to get the latest elementor installed!';
    console.log(colors.error(msg || defaultMsg));
    console.error(Error(e));
    process.exit(0);
}

/**
 * file structure utils
 */
const paths = {
    exists: path => fs.existsSync(path),
    make: path => execSync(`mkdir ${path}`),
    clear: path => execSync(`rm -r ${path}/*`),
};

module.exports = {
    makeTaskRunner,
    fatalProcessError,
    paths,
};
