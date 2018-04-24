const path = require('path');

const dir = process.cwd();
const resolve = relPath => path.resolve(dir, relPath);

module.exports = {
    output: resolve('./public/js'),
    melody: {
        css: {
            vars: resolve('./src/melody/global-styles/variables'),
            animations: resolve('./src/melody/global-styles/animations'),
            output: '../css/melody.min.css',
        },
        js: {
            entry: resolve('./src/melody/index.tsx'),
            components: resolve('./src/melody/components/'),
            redux: resolve('./src/melody/redux/'),
            utils: resolve('./src/melody/utils/'),
            stateMachine: resolve('./src/melody/state-machine/'),
            constants: resolve('./src/melody/constants'),
            views: resolve('./src/melody/views/'),
            melody: resolve('./src/melody/'),
        },
    },
    adapter: {
        js: {
            entry: resolve('./src/adapter/index.ts'),
            adapter: resolve('./src/adapter/'),
        },
    },
    controls: {
        js: {
            entry: resolve('./src/controls/index.ts'),
        },
    },
    devServer: {
        js: 'http://localhost:4000/wp-content/plugins/elmtr-melody/public/js/', 
    },
};