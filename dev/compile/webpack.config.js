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
        filename: mode === 'development' ? '[name].dev.js' : '[name].[chunkhash].js',
    },
    module: {
        rules: pipes.map(pipe => pipe(mode, libs)),
    },
    optimization: optimizations(),
    plugins: plugins(mode, libs),
});
