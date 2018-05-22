import { render } from 'preact-render-to-string';
import { h } from 'preact';
import NoTracksFront from '../NoTracksFront';

describe('NoTracksFront', () => {
    it('renders', () => {
        const component = render(<NoTracksFront/>);
        expect(component).toMatchSnapshot();
    });
});
