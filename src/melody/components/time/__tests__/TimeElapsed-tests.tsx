import { render } from 'preact-render-to-string';
import { h } from 'preact';
import TimeElapsed from '../TimeElapsed';

interface Props extends WithOptionalClassName {
    currentTime: number;
    getTime: (time: number) => string;
}

describe('TimeElapsed', () => {
    it('renders', () => {
        // const component = render(
        //     <TimeElapsed
        //         currentTime={23}
        //         getTime={() => 100}
        //     />
        // );
        // console.log(component);
        // expect(component).toMatchSnapshot();
    });
});
