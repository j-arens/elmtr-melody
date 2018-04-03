const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

module.exports = project => {
    const plugins = [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ];

    if (project === 'melody') {
        plugins.push(new ExtractTextPlugin(paths.melody.css.output));
    }

    return plugins;
};