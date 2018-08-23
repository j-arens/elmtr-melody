const { EnvironmentPlugin } = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WordPressEnqueueChunksPlugin } = require('wordpress-enqueue-chunks-webpack-plugin');
const paths = require('./paths');

module.exports = (mode, libs) => {
    const plugins = [
        new WordPressEnqueueChunksPlugin({
            assetsDir: 'elmtr-melody/public/js',
            namespace: 'melody-js',
            phpScriptDir: './plugin/assets',
        }),
        new EnvironmentPlugin({
            NODE_ENV: `${mode}`,
        }),
    ];

    if (libs.includes('melody') || libs.includes('adapter')) {
        plugins.push(new ExtractPlugin(paths.melody.css.output));
    }

    if (mode === 'development') {
        plugins.push(
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 4001,
                files: ['./**/*.php'],
                proxy: 'http://localhost:4000',
            }),
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'disabled',
            //     generateStatsFile: true,
            //     statsFilename: 'bundle-stats.json',
            //     openAnalyzer: false,
            // }),
        );
    }

    return plugins;
};
