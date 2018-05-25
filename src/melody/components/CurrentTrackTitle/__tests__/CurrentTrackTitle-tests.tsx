import { h } from 'preact';
import { render } from 'preact-render-to-string';
import CurrentTrackTitle from '../CurrentTrackTitle';

describe('CurrentTrackTitle', () => {
    it('renders', () => {
        const component = render(
            <CurrentTrackTitle
                currentTrackTitle="rofl"
                className="purple-silk"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
