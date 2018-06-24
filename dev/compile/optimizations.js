const makeTestRunner = tests => (module, chunks) =>
    chunks.some(chunk => tests.chunk(chunk)) && tests.module(module);

module.exports = () => ({
    splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '-',
        cacheGroups: {
            'common-adapter-melody': {
                name: 'common-adapter-melody',
                priority: 0,
                chunks: 'initial',
                minChunks: 2,
                enforce: true,
                test: makeTestRunner({
                    chunk: chunk => chunk.name !== 'controls',
                    module: module => !/node_modules/.test(module.nameForCondition()),
                }),
            },
        },
    },
});
