import { NO_OP } from '@utils';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Glider from '../Glider';

describe('Glider', () => {
    it('renders', () => {
        const component = render(
            <Glider
                currentState="stopped"
                duration={100}
                currentTime={0}
                updateCurrentTime={NO_OP}
                toggleGliderDragging={NO_OP}
                triggerTimeSync={NO_OP}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
