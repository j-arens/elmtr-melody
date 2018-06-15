const makeChunkTestRunner = ({ testChunk, testModule }) => (module, chunks) =>
    chunks.some(chunk => testChunk(chunk)) && testModule(module);

module.exports = () => ({
    splitChunks: {
        cacheGroups: {
            default: false,
            'vendors-controls': {
                name: 'vendors-controls',
                priority: 0,
                chunks: 'initial',
                enforce: true,
                test: makeChunkTestRunner({
                    testChunk: chunk => chunk.name === 'controls',
                    testModule: module => /node_modules/.test(module.nameForCondition()),
                }),
            },
            'vendors-adapter-melody': {
                name: 'vendors-adapter-melody',
                priority: 1,
                chunks: 'initial',
                enforce: true,
                test: makeChunkTestRunner({
                    testChunk: chunk => chunk.name === 'adapter' || chunk.name === 'melody',
                    testModule: module => /node_modules/.test(module.nameForCondition()),
                }),
            },
            'common-adapter-melody': {
                name: 'common-adapter-melody',
                priority: 0,
                chunks: 'initial',
                enforce: true,
                test: makeChunkTestRunner({
                    testChunk: chunk => chunk.name === 'adapter' || chunk.name === 'melody',
                    testModule: module => !/node_modules/.test(module.nameForCondition()),
                }),
            },
        },
    },
});
