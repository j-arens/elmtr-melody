import { h } from 'preact';
import { render } from 'preact-render-to-string';
import CurrentTrackArtist from '../CurrentTrackArtist';

describe('CurrentTrackArtist', () => {
    it('renders', () => {
        const component = render(
            <CurrentTrackArtist
                currentTrackArtist="lol"
                className="signal-green"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
