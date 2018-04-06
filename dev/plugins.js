const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const paths = require('./paths');

module.exports = libs => {
    const plugins = [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ];

    if (libs.includes('melody')) {
        plugins.push(new ExtractTextPlugin(paths.melody.css.output));
    }

    if (process.env.NODE_ENV === 'development') {
        plugins.push(new BrowserSyncPlugin({
            host: 'localhost',
            port: 4001,
            files: ['./**/*.php'],
            proxy: 'http://localhost:4000',
        }));
    }

    return plugins;
};