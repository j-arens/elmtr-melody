const tsc = require('typescript');
const tsconfig = require('../tsconfig.json');
const babel = require('babel-core');
const { h } = require('preact');

const compile = source => babel.transform(
        source,
        {
            plugins: [
                ['transform-react-jsx', { pragma: h }],
            ],
        },
    ).code;

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            const transpiled = tsc.transpile(
                src,
                tsconfig.compilerOptions,
                path,
                []
            );
            return compile(transpiled);
        };
        return compile(src);
    }
};
