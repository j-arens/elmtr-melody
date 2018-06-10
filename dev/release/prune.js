const path = require('path');
const fs = require('fs');
const colors = require('../scripts/colors');
const { TEMP_DIR } = require('./constants'); 
const { paths } = require('../scripts/utils');

const FILES = [
    'tslint.json',
    'tsconfig.json',
    'package.json',
    'package-lock.json',
    'jest.config.js',
    'docker-compose.yml',
    '.gitignore',
];

const DIRS = [
    'src',
    'spec',
    'node_modules',
    'dev',
    '.vscode',
];

module.exports = (next) => {
    console.log(colors.info('pruning unwanted files and directories'));
    FILES.forEach(file => fs.unlinkSync(path.resolve(TEMP_DIR, file)));
    DIRS.forEach(dir => paths.clear(path.resolve(TEMP_DIR, dir)));
    next();
};
