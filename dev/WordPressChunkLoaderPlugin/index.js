'use strict';

const TemplateProcessor = require('./TemplateProcessor');
const ChunkMapper = require('./ChunkMapper');

module.exports = class WordPressChunkLoaderPlugin {
    constructor(opts) {
        this.TemplateProcessor = new TemplateProcessor(opts);
        this.ChunkMapper = new ChunkMapper(this.TemplateProcessor);
    }

    /**
     * Apply hooks
     * 
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.hooks.done.tap(
            'WordPressChunkLoaderPlugin',
            this.ChunkMapper.onHook.bind(this.ChunkMapper),
        );
    }
}
