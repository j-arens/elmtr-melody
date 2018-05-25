import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Dock from '../Dock';

describe('Dock', () => {
    let track;

    beforeEach(() => {
        track = {
            download_url: '',
            attributes: {
                origin: 'external',
            },
        };
    });

    it('renders just the toggle button if showDock is false', () => {
        const component = render(
            <Dock
                showDock={false}
                track={track}
                playbackRate={1}
                triggerClassName="san-marino-blue"
                className="speed-yellow"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders the full dock if showDock is true', () => {
        const component = render(
            <Dock
                showDock
                track={track}
                playbackRate={1}
                triggerClassName="san-marino-blue"
                className="speed-yellow"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders the download button if the current track is downloadable', () => {
        track.download_url = 'http://download.me/track-cool.mp3';
        const component = render(
            <Dock
                showDock
                track={track}
                playbackRate={1}
                triggerClassName="san-marino-blue"
                className="speed-yellow"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
