const paths = require('./paths');
const pipes = require('./pipes/');
const plugins = require('./plugins');
const optimizations = require('./optimizations');

module.exports = ({ mode = 'development', libs }) => ({
    mode,
    entry: libs.split(',').reduce((entries, lib) => {
        entries[lib] = paths[lib].js.entry;
        return entries;
    }, {}),
    devtool: mode === 'development' ? 'inline-cheap-module-source-map' : false,
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
            '@adapter': paths.adapter.js.adapter,
        },
    },
    output: {
        path: paths.output,
        filename: '[name].bundle.js',
    },
    module: {
        rules: Object.values(pipes),
    },
    optimization: optimizations(mode),
    plugins: plugins(mode, libs),
});
