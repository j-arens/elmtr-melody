import { h } from 'preact';
import { render } from 'preact-render-to-string';
import BadSource from '../BadSource';

describe('DefaultError', () => {
    it('renders', () => {
        const component = render(<BadSource/>);
        expect(component).toMatchSnapshot();
    });
});
