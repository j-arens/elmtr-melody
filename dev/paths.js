const path = require('path');

const dir = process.cwd();
const resolve = relPath => path.resolve(dir, relPath);

module.exports = {
    melody: {
        css: {
            vars: resolve('./src/melody/global-styles/variables'),
            animations: resolve('./src/melody/global-styles/animations'),
            mixins: resolve('./src/melody/global-styles/mixins'),
            output: '../css/melody.min.css',
        },
        js: {
            entry: resolve('./src/melody/index.tsx'),
            output: resolve('./public/js'),
            components: resolve('./src/melody/components/'),
            redux: resolve('./src/melody/redux/'),
            utils: resolve('./src/melody/utils/'),
            stateMachine: resolve('./src/melody/state-machine/'),
            constants: resolve('./src/melody/constants'),
            views: resolve('./src/melody/views/'),
        },
    },
    adapter: {
        js: {
            entry: resolve('./src/adapter/index.ts'),
            output: resolve('./public/js'),
        },
    },
    audioPicker: {
        js: {
            entry: resolve('./src/audio-picker/index.ts'),
            output: resolve('./public/js'),
        },
    },
};