import { h } from 'preact';
import { render } from 'preact-render-to-string';
import * as collectors from '../Collector';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

describe('ErrorHandler', () => {
    it('renders errors if there are any', () => {
        jest.spyOn(collectors, 'default').mockImplementationOnce(() => new Set([1]));
        const component = render(
            <ErrorHandler state={{}} audioInterface={{}}>
                <p>lol</p>
            </ErrorHandler>,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders its children if there are no errors', () => {
        jest.spyOn(collectors, 'default').mockImplementationOnce(() => new Set());
        const component = render(
            <ErrorHandler state={{}} audioInterface={{}}>
                <p>lol</p>
            </ErrorHandler>,
        );
        expect(component).toMatchSnapshot();
    });
});
