import { render } from 'preact-render-to-string';
import { h } from 'preact';
import BaseButton from '../';

describe('SimpleToolbar', () => {
    it('renders', () => {
        const component = render(
            <BaseButton className="hey">
                <p>hi</p>
            </BaseButton>
        );
        expect(component).toMatchSnapshot();
    });
});
