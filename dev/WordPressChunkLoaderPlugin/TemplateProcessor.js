'use strict';

const path = require('path');
const fs = require('fs');

module.exports = class TemplateProcessor {
    constructor(opts) {
        this.defaults = {
            templatePath: path.resolve(__dirname, './embeddedLoader.txt'),
            phpScriptVersion: '1.0.0', // set in package.json
            repoUrl: '', // set in package.json
            contributorsList: '', // set in package.json
            manifest: {
                entries: {},
                chunks: {},
            },
        };

        this.configurable = {
            context: 'theme',
            handleNamespace: '',
            handleDelimiter: '-',
            assetPath: process.cwd(),
            phpOutputDir: process.cwd(),
        };

        this.opts = Object.assign({}, this.configurable, opts, this.defaults);
    }

    /**
     * Iterate through all of the steps to generate the php loader
     */
    processTemplate(manifest) {
        this.opts.manifest = manifest;
        const template = this.loadTemplate();
        const setTemplate = this.setTemplateVars(template);
        this.outputTemplate(setTemplate);
    }

    /**
     * Read the php loader template into mem 
     */
    loadTemplate() {
        return fs.readFileSync(this.opts.templatePath, 'utf8');
    }

    /**
     * Replaces the template tags with corresponding values
     * 
     * @param {string} template 
     * @return {string}
     */
    setTemplateVars(template) {
        const { opts: {
            phpScriptVersion,
            repoUrl,
            context,
            assetPath,
            handleNamespace,
            handleDelimiter,
            manifest,
            contributorsList,
        } } = this;
        const jsonManifest = JSON.stringify(manifest);
        return eval('`'+template+'`');
    }

    /**
     * Writes the template to the specefied location
     * 
     * @callback next 
     * @param {string} template 
     */
    outputTemplate(template) {
        const { phpOutputDir } = this.opts;
        const outputPath = path.join(phpOutputDir, 'WordPressChunkLoaderPlugin.php');
        fs.writeFileSync(outputPath, template, 'utf8', err => {
            if (err) {
                throw new Error(`WordPressChunkLoaderPlugin: Unable to write the loader template to ${outputPath}!`);
            }
        });
    }
}
