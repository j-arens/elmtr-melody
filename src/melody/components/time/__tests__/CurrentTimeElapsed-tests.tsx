import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { CurrentTimeElapsed } from '../CurrentTimeElapsed';

describe('CurrentTimeElapsed', () => {
    it('renders', () => {
        const component = render(
            <CurrentTimeElapsed
                className="alpine-white"
                currentTime={0}
                getTime={jest.fn().mockReturnValueOnce(80)}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
