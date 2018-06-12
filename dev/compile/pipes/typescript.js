module.exports = () => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                plugins: [
                    ['@wordpress/babel-plugin-makepot', {
                        output: 'languages/melody.pot',
                    }],
                ],
            },
        },
        'awesome-typescript-loader',
    ],
});
