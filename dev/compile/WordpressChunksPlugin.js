class WordpressChunksPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('WordpressChunksPlugin', this.onHook);
    }

    onHook({ compilation }, callback) {
        // console.log('compilation', Object.keys(compilation));
        // console.log(compilation.options.optimization);

        if (!compilation.options.optimization.splitChunks) {
            console.error('WordpressChunksPlugin requires splitChunks to be enabled!');
            process.exit(1);
        }

        // console.log('optimizations', compilation.options);
        // console.log('compilation entries', compilation.entries);
        // console.log('compilition entry points', compilation.entrypoints);
        // console.log('compilation chunks', compilation.chunks);
        // console.log('compilation named chunk groups', compilation.namedChunkGroups);
        // console.log('compilation named chunks', compilation.namedChunks);

        console.log('compilation chunkgroups', compilation.chunkGroups[0]);
    }
}

module.exports = WordpressChunksPlugin;
