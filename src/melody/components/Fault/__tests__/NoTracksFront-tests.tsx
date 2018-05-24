import { h } from 'preact';
import { render } from 'preact-render-to-string';
import NoTracksFront from '../NoTracksFront';

describe('NoTracksFront', () => {
    it('renders', () => {
        const component = render(<NoTracksFront/>);
        expect(component).toMatchSnapshot();
    });
});
