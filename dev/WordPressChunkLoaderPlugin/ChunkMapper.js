'use strict';

module.exports = class ChunkMapper {
    constructor(TemplateProcesser) {
        this.TemplateProcessor = TemplateProcesser;
        this.entries = new Map();
        this.chunks = new Map();
    }

    /**
     * Hook callback
     * 
     * @param {Object} data
     * @param {Object} data.compilation
     */
    onHook({ compilation }) {
        const { TemplateProcessor } = this;
        compilation.chunkGroups.forEach(group => this.addEntry(group));
        const manifest = this.makeManifest();
        TemplateProcessor.processTemplate.call(TemplateProcessor, manifest);
    }

    /**
     * Register an entry and it's properties
     * 
     * @param {Object} entry
     * @param {string} entry.name
     * @param {Object[]} entry.chunks
     */
    addEntry({ name, chunks }) {
        if (this.entries.has(name)) {
            return;
        }
        this.entries.set(name, {
            deps: this.mapDependencies(name, chunks),
        });
    }

    /**
     * Map the names of an entries dependencies
     * 
     * @param {Object[]} chunks
     * @return {string[]} 
     */
    mapDependencies(name, chunks) {
        return chunks
            .filter(chunk => {
                this.addChunk(chunk);
                return chunk.name !== name;
            })
            .map(c => c.name);
    }

    /**
     * Register a chunk and it's properties
     * 
     * @param {Object} chunk 
     * @param {string} chunk.name
     * @param {string} chunk.hash
     * @param {array} chunk.files
     */
    addChunk({ name, hash, files }) {
        if (this.chunks.has(name)) {
            return;
        }
        this.chunks.set(name, {
            hash,
            file: files[0],
        });
    }

    /**
     * Create a manifest object
     * 
     * @return {Object}
     */
    makeManifest() {
        const { entries, chunks } = this;
        return {
            entries: this.mapToObject(entries),
            chunks: this.mapToObject(chunks),
        }
    }

    /**
     * Transform a Map into a object
     * 
     * @param {Map} map
     * @return {Object}
     */
    mapToObject(map) {
        return Array.from(map.entries()).reduce((obj, [ k, v ]) => {
            obj[k] = v;
            return obj;
        }, {});
    }
}
