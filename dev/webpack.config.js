const paths = require('./paths');
const pipes = require('./pipes/');
const plugins = require('./plugins');

module.exports = ({ project }) => ({
    entry: paths[project].js.entry,
    devtool: 'inline-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            '@components': paths.melody.js.components,
            '@redux': paths.melody.js.redux,
            '@utils': paths.melody.js.utils,
            '@state-machine': paths.melody.js.stateMachine,
            '@constants': paths.melody.js.constants,
            '@views': paths.melody.js.views,
        },
    },
    output: {
        path: paths[project].js.output,
        filename: `${project}.bundle.js`,
    },
    module: {
        rules: Object.values(pipes),
    },
    plugins: plugins(project),
});