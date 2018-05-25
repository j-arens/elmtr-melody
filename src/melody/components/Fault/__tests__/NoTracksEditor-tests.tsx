import { h } from 'preact';
import { render } from 'preact-render-to-string';
import NoTracksEditor from '../NoTracksEditor';

describe('NoTracksEditor', () => {
    it('renders', () => {
        const component = render(<NoTracksEditor/>);
        expect(component).toMatchSnapshot();
    });
});
