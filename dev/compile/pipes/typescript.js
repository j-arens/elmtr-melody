module.exports = () => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['es2015', { modules: false }],
                    'react',
                ],
                plugins: [
                    ['@wordpress/babel-plugin-makepot', {
                        output: 'languages/melody.pot',
                    }],
                    'transform-class-properties',
                ],
            },
        },
        'awesome-typescript-loader',
    ],
});
