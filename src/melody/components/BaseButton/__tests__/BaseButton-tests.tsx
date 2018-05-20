// import render from 'preact-render-to-string';
const render = require('preact-render-to-string');
import { h } from 'preact';
import BaseButton from '../';

describe('SimpleToolbar', () => {
    it('renders', () => {
        const result = render(<BaseButton>hi</BaseButton>);
        expect(result).toMatchSnapshot();
    });
});
