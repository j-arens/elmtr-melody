const { execSync } = require('child_process');
const colors = require('../scripts/colors');
const { makeTaskRunner } = require('../scripts/utils');
const {
    CHECKOUT_BRANCH,
    REPO_URL,
    TEMP_DIR,
} = require('./constants');

/**
 * Git clones the project into a temp dir
 */
function checkout(next) {
    console.log(colors.info('🚀 switching to master and pulling latest...'));
    execSync('git checkout master && git pull');
    console.log(colors.info(`⬇️ cloning ${CHECKOUT_BRANCH} branch`));
    execSync(`git clone -b ${CHECKOUT_BRANCH} --single-branch ${REPO_URL} ${TEMP_DIR}`);
    next();
}

/**
 * Installs dependencies
 */
function install(next) {
    console.log(colors.info('📦 installing dependencies...'));
    execSync(`cd ${TEMP_DIR} && npm ci && composer install --no-dev`);
    next();
}

/**
 * Validate the build by running tests 
 */
function validate(next) {
    console.log(colors.info('⚖️ running e2e tests...'));
    try {
        if (!execSync('docker-compose ps -q melody_wordpress')) {
            execSync('docker-compose up -d');
        }
        execSync(`cd ${TEMP_DIR} && npm run test:e2e`, { stdio: 'inherit' });
    } catch (err) {
        console.log(colors.error('failed passing tests', err));
        process.exit(1);
        return;
    }
    next();
}

/**
 * Runs webpack and compiles source files
 */
function build(next) {
    console.log(colors.info('🖥 compiling scripts'));
    execSync(`cd ${TEMP_DIR} && export NODE_ENV=production && npm run build:all -- --env.mode=production`);
    next();
}

/**
 * Runs i18n scripts 
 */
function i18n(next) {
    console.log(colors.info('📖 running i18n scripts'));
    execSync(`cd ${TEMP_DIR} && npm run i18n`);
    next();
}

const tasks = [
    checkout,
    install,
    build,
    validate,
    i18n,
];

const taskRunner = makeTaskRunner(tasks);
taskRunner.run();
