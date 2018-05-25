import { h } from 'preact';
import { render } from 'preact-render-to-string';
import RepeatButton from '../RepeatButton';

describe('RepeatButton', () => {
    it('renders', () => {
        const component = render(
            <RepeatButton
                repeat={false}
                className="atlantis-blue"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a active class if repeat is on', () => {
        const component = render(
            <RepeatButton
                repeat
                className="atlantis-blue"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
