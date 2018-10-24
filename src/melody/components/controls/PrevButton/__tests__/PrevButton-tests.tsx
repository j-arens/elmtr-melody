import { h } from 'preact';
import { render } from 'preact-render-to-string';
import PrevButton from '../PrevButton';

describe('PrevButton', () => {
    it('renders', () => {
        const component = render(
            <PrevButton
                totalTracks={100}
                currentTime={1}
                className="sapphire-blue"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a disabled class if theres only one track and currentTime is 0', () => {
        const component = render(
            <PrevButton
                totalTracks={1}
                currentTime={0}
                className="sapphire-blue"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
