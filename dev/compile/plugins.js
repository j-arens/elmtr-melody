const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const paths = require('./paths');
const WordpressChunksPlugin = require('./WordpressChunksPlugin');

module.exports = (mode, libs) => {
    const plugins = [
        new WordpressChunksPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: `${mode}`,
        }),
    ];

    if (libs.includes('melody') || libs.includes('adapter')) {
        plugins.push(new ExtractPlugin(paths.melody.css.output));
    }

    if (mode === 'development') {
        plugins.push(new BrowserSyncPlugin({
            host: 'localhost',
            port: 4001,
            files: ['./**/*.php'],
            proxy: 'http://localhost:4000',
        }));
    }

    return plugins;
};
