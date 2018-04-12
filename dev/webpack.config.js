const paths = require('./paths');
const pipes = require('./pipes/');
const plugins = require('./plugins');

// const defaultEntries = {
//     i18n: './node_modules/@wordpress/i18n',
// };

module.exports = ({ libs }) => ({
    entry: libs.split(',').reduce((entries, lib) => {
        entries[lib] = paths[lib].js.entry;
        return entries;
    }, {}),
    devtool: 'inline-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            '@melody': paths.melody.js.melody,
            '@components': paths.melody.js.components,
            '@redux': paths.melody.js.redux,
            '@utils': paths.melody.js.utils,
            '@state-machine': paths.melody.js.stateMachine,
            '@constants': paths.melody.js.constants,
            '@views': paths.melody.js.views,
        },
    },
    output: {
        path: paths.output,
        filename: '[name].bundle.js',
    },
    module: {
        rules: Object.values(pipes),
    },
    plugins: plugins(libs),
});
