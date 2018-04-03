const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('../paths');
const { melody: { css } } = paths;

const globalImports = `
    @import '${css.vars}';
    @import '${css.animations}';
    @import '${css.mixins}';
`;

module.exports = {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader',
            options: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: 'melody [local]__[hash:base64:5]',
            }
        }, {
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require('autoprefixer')(),
                    // require('cssnano')(), // prod-build?
                ],
            },
        }, {
            loader: 'sass-loader',
            options: {
                data: globalImports
            },
        }],
    }),
}