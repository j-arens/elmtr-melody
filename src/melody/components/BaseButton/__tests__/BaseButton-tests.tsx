import { h } from 'preact';
import { render } from 'preact-render-to-string';
import BaseButton from '../';

describe('BaseButton', () => {
    it('renders', () => {
        const component = render(
            <BaseButton className="hey">
                <p>hi</p>
            </BaseButton>,
        );
        expect(component).toMatchSnapshot();
    });
});
