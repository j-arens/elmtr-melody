const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const paths = require('../paths');
const { melody: { css } } = paths;

const globalImports = `
    @import '${css.vars}';
    @import '${css.animations}';
`;

module.exports = (mode, libs) => {
    if (libs.length === 1 && libs[0] === 'controls') {
        return {};
    }
    
    const plugins = [
        autoprefixer(),
    ];

    if (mode === 'production') {
        plugins.push(
            cssnano()
        );
    }

    return {
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
                    sourceMap: mode === 'development',
                    ident: 'postcss',
                    plugins,
                },
            }, {
                loader: 'sass-loader',
                options: {
                    data: globalImports
                },
            }],
        }),
    };
};
