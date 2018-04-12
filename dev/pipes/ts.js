// module.exports = {
//     test: /\.tsx?$/,
//     exclude: /node_modules/,
//     loader: 'awesome-typescript-loader',
// };


// module.exports = {
//     test: /\.jsx?$/,
//     exclude: /node_modules/,
//     use: {
//         loader: 'babel-loader',
//         options: {
//             presets: [
//                 ['es2015', { modules: false }],
//                 'react',
//             ],
//             plugins: [
//                 '@wordpress/babel-plugin-makepot',
//                 'transform-class-properties',
//             ],
//         },
//     },
// };

module.exports = {
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
                    '@wordpress/babel-plugin-makepot', // configure
                    'transform-class-properties',
                ],
            },
        },
        'awesome-typescript-loader',
    ],
};
