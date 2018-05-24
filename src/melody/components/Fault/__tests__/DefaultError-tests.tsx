import { h } from 'preact';
import { render } from 'preact-render-to-string';
import DefaultError from '../DefaultError';

describe('DefaultError', () => {
    it('renders', () => {
        const component = render(<DefaultError/>);
        expect(component).toMatchSnapshot();
    });
});
