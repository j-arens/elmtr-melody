const { execSync } = require('child_process');
const colors = require('../scripts/colors');
const { makeTaskRunner } = require('../scripts/utils');
const prune = require('./prune');
const {
    CHECKOUT_BRANCH,
    REPO_URL,
    TEMP_DIR,
} = require('./constants');

/**
 * Git clones the project into a temp dir
 */
function checkout(next) {
    console.log(colors.info(`⬇️ cloning branch ${CHECKOUT_BRANCH}`));
    execSync(`git clone ${CHECKOUT_BRANCH} ${REPO_URL} ${TEMP_DIR}`);
    next();
}

/**
 * Installs dependencies
 */
function install(next) {
    console.log(colors.info('📦 installing dependencies'));
    execSync(`cd ${TEMP_DIR} && npm i && composer install && composer dumpautoload --no-dev`);
    next();
}

/**
 * Runs webpack and compiles source files
 */
function build(next) {
    console.log(colors.info('🖥 compiling assets'));
    execSync(`cd ${TEMP_DIR} && export NODE_ENV=production && npm run build:all -- --env.mode=production`);
    next();
}

const tasks = [
    checkout,
    install,
    build,
    prune,
];

const taskRunner = makeTaskRunner(tasks);
taskRunner.run();
