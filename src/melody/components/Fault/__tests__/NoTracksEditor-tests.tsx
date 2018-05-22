import { render } from 'preact-render-to-string';
import { h } from 'preact';
import NoTracksEditor from '../NoTracksEditor';

describe('NoTracksEditor', () => {
    it('renders', () => {
        const component = render(<NoTracksEditor/>);
        expect(component).toMatchSnapshot();
    });
});
