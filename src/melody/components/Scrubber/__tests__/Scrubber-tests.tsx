import { NO_OP } from '@utils';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Scrubber from '../Scrubber';

describe('Glider', () => {
    it('renders', () => {
        const component = render(
            <Scrubber
                currentState="stopped"
                duration={100}
                currentTime={0}
                updateCurrentTime={NO_OP}
                toggleComponentDragging={NO_OP}
                triggerTimeSync={NO_OP}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
