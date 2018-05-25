import { h } from 'preact';
import { render } from 'preact-render-to-string';
import CatalystButton from '../CatalystButton';

describe('CatalystButton', () => {
    it('renders with a play icon if current state is stopped', () => {
        const component = render(
            <CatalystButton
                currentState="stopped"
                className="carrera-white"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a pause icon if current state is playing', () => {
        const component = render(
            <CatalystButton
                currentState="playing"
                className="carrera-white"
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders with a buffering icon if current state is buffering', () => {
        const component = render(
            <CatalystButton
                currentState="buffering"
                className="carrera-white"
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
