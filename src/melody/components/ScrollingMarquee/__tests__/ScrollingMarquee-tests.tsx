import { h } from 'preact';
import { render } from 'preact-render-to-string';
import ScrollingMarquee from '../';

describe('ScrollingMarquee', () => {
    it('renders', () => {
        const component = render(
            <ScrollingMarquee>
                <div>
                    <p>track</p>
                    <span>-</span>
                    <p>artist</p>
                </div>
            </ScrollingMarquee>,
        );
        expect(component).toMatchSnapshot();
    });
});
