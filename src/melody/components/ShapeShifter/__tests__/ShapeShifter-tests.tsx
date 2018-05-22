// import { renderToJsxString } from 'preact-render-to-string/jsx';
const renderToJsxString = require('preact-render-to-string/jsx');
import { h } from 'preact';
import ShapeShifter from '../ShapeShifter';

// console.log(renderToJsxString);

describe('ShapeShifter', () => {
    it('renders simple toolbar', () => {
        const component = renderToJsxString(
            <ShapeShifter view="simple-toolbar" />,
            null,
            { shallow: true },
        );
        console.log(component);
        // expect(component).toMatchSnapshot();
    });
});
