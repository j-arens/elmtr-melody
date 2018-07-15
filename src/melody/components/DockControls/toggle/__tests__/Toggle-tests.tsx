import { NO_OP } from '@utils/index';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Toggle from '../Toggle';

describe('Toggle', () => {
    it('matches snapshot', () => {
        const component = render(
            <Toggle
                toggleDock={NO_OP}
                showDock
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
