module.exports = (mode) => {
    if (mode === 'development') {
        return {};
    }

    return {};

    // return {
    //     minimizer: [
    //         new UglifyJSPlugin({
    //             compress: true,
    //             output: {
    //                 comments: false,
    //             },
    //             compress: {
    //                 dead_code: true,
    //                 // drop_console: true, ????
    //             },
    //             sourceMap: false,
    //         }),
    //     ],
    // };
};