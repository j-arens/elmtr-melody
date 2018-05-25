import { h } from 'preact';
import { render } from 'preact-render-to-string';
import ShuffleButton from '../ShuffleButton';

describe('ShuffleButton', () => {
    it('renders', () => {
        const component = render(
            <ShuffleButton
                shuffle={false}
                className="imola-red"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a active class if shuffle is on', () => {
        const component = render(
            <ShuffleButton
                shuffle
                className="imola-red"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
