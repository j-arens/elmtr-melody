import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Slider from '../';

describe('Slider', () => {
    it('renders', () => {
        const component = render(
            <Slider
                height={5}
                handleSize={10}
                offset={0}
                eventRadius={10}
                classes={{
                    slider: 'lol-slider',
                    body: 'lol-body',
                    backfill: 'lol-backfill',
                    handle: 'lol-handle',
                }}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
