module.exports = () => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: ['ts-loader'],
});
