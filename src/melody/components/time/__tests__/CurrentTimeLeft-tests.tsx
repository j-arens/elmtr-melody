import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { CurrentTimeLeft } from '../CurrentTimeLeft';

describe('CurrentTimeLeft', () => {
    it('renders', () => {
        const component = render(
            <CurrentTimeLeft
                className="yas-marina-blue"
                currentTime={0}
                duration={0}
                getTime={jest.fn().mockReturnValueOnce(80)}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
