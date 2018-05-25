import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Slideshow from '../Slideshow';

describe('Slideshow', () => {
    let tracks;

    beforeEach(() => {
        tracks = [{
            source_url: '',
            download_url: '',
            artwork: {},
            media_details: {},
            attributes: {},
        }];
    });

    it('renders', () => {
        const component = render(
            <Slideshow
                className="yas-marina-blue"
                currentTrack={0}
                tracks={tracks}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('translates based on the current track', () => {
        const component = render(
            <Slideshow
                className="yas-marina-blue"
                currentTrack={5}
                tracks={tracks}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
