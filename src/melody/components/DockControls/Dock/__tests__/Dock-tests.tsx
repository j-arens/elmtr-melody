import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Dock from '../Dock';

describe('Dock', () => {
    it('is hidden if showDock is false', () => {
        const component = render(
            <Dock
                showDock={false}
                track={{}}
                playbackRate={0}
                coordinates={{}}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
