const { EnvironmentPlugin } = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');

module.exports = (mode, libs) => {
    const plugins = [
        new EnvironmentPlugin({
            NODE_ENV: `${mode}`,
        }),
        new ManifestPlugin({
            publicPath: 'public/js/',
            filter: ({ path }) => !path.endsWith('.css'),
            map: asset => {
                asset.name = asset.name.replace(/\.js$/, '');
                return asset;
            },
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
