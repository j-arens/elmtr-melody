const { EnvironmentPlugin } = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WordPressChunkLoaderPlugin = require('../WordPressChunkLoaderPlugin/index');
const paths = require('./paths');

module.exports = (mode, libs) => {
    const plugins = [
        new WordPressChunkLoaderPlugin({
            context: 'plugin',
            assetPath: 'elmtr-melody/public/js',
            phpOutputDir: './plugin/assets',
            handleNamespace: 'melody-js',
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
