import { h } from 'preact';
import { render } from 'preact-render-to-string';
import PrevButton from '../PrevButton';

describe('PrevButton', () => {
    it('renders', () => {
        const component = render(
            <PrevButton
                totalTracks={100}
                className="sapphire-blue"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a disabled class if totalTracks <= 1', () => {
        const component = render(
            <PrevButton
                totalTracks={1}
                className="sapphire-blue"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
