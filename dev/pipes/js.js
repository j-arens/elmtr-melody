module.exports = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                ['es2015', { modules: false }],
                'react',
            ],
            plugins: [
                '@wordpress/babel-plugin-makepot',
                'transform-class-properties',
            ],
        },
    },
};
