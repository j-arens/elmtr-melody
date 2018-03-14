const webpack = require('webpack');
const path = require('path');
const tsPipe = require('./tsPipe');

module.exports = ({ index, name }) => ({
    entry: path.join(__dirname, `../assets/src/${index}`),
    devtool: 'inline-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, '../assets/js/'),
        filename: `${name}.bundle.js`,
    },
    module: {
        rules: [
            tsPipe,
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ],
});