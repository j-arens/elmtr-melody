const fs = require('fs');
const replace = require('replace-in-file');
const colors = require('../scripts/colors');
const { fatalError } = require('../scripts/utils');
const pkg = require('../../package.json');
const { version } = pkg;

console.log(colors.info(`updating the plugin file header version to ${version}`));

replace({
    files: 'elementor-melody.php',
    from: /^Version: .*/gm,
    to: `Version: ${version}`,
})
.catch(err => fatalError('Unable to update plugin file header version!', err));
