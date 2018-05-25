import { h } from 'preact';
import { render } from 'preact-render-to-string';
import NextButton from '../NextButton';

describe('NextButton', () => {
    it('renders', () => {
        const component = render(
            <NextButton
                totalTracks={100}
                className="jet-black"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a disabled class if totalTracks <= 1', () => {
        const component = render(
            <NextButton
                totalTracks={1}
                className="jet-black"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
