const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');
const { TEMP_DIR } = require('./constants');
const colors = require('../scripts/colors');
const { fatalError } = require('../scripts/utils');
const pkg = require(path.resolve(TEMP_DIR, 'package.json'));
const { version } = pkg;

console.log(colors.info(`updating the plugin file header version to ${version}`));

replace({
    files: path.resolve(TEMP_DIR, 'elementor-melody.php'),
    from: /^Version: .*/gm,
    to: `Version: ${version}`,
})
.catch(err => fatalError('Unable to update plugin file header version!', err));
