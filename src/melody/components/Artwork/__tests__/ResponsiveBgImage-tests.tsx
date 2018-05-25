import { h } from 'preact';
import { render } from 'preact-render-to-string';
import ResponsiveBgImage from '../ResponsiveBgImage';

describe('ResponsiveBgImage', () => {
    it('renders', () => {
        const component = render(
            <ResponsiveBgImage
                artwork={{}}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
