import { h } from 'preact';
import { render } from 'preact-render-to-string';
import FaultContainer from '../FaultContainer';

describe('FaultContainer', () => {
    it('renders', () => {
        const component = render(
            <FaultContainer>
                <div>alpine white</div>
            </FaultContainer>,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders without a reload button', () => {
        const component = render(
            <FaultContainer allowReload={false}>
                <div>alpine white</div>
            </FaultContainer>,
        );
        expect(component).toMatchSnapshot();
    });
});
