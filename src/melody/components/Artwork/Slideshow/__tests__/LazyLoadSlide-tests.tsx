import { render } from 'preact-render-to-string';
import { h } from 'preact';
import LazyLoadSlide from '../LazyLoadSlide';

describe('LazyLoadSlide', () => {
    it('renders a loaded slide', () => {
        const component = render(
            <LazyLoadSlide
                className="guard-red"
                currentTrack={0}
                totalTracks={5}
                index={0}
            >
                <div>lol</div>
            </LazyLoadSlide>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders a lazy slide', () => {
        const component = render(
            <LazyLoadSlide
                className="austin-yellow"
                currentTrack={0}
                totalTracks={5}
                index={3}
            >
                <div>lol</div>
            </LazyLoadSlide>
        );
        expect(component).toMatchSnapshot();
    });
});
