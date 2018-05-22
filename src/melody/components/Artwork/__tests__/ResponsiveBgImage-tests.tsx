import { render } from 'preact-render-to-string';
import { h } from 'preact';
import ResponsiveBgImage from '../ResponsiveBgImage';

describe('ResponsiveBgImage', () => {
    it('renders', () => {
        const component = render(
            <ResponsiveBgImage
                artwork={{}}
            />
        );
        expect(component).toMatchSnapshot();
    });
});
