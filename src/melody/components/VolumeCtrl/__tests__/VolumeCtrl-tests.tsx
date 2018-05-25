import { h } from 'preact';
import { render } from 'preact-render-to-string';
import VolumeCtrl from '../VolumeCtrl';

describe('VolumeCtrl', () => {
    let mockprops;

    beforeEach(() => {
        mockprops = {
            toggleVolDragging: jest.fn(),
            updateVolume: jest.fn(),
            isDragging: jest.fn(),
            setDragRef: jest.fn(),
            onDragStart: jest.fn(),
            onDrag: jest.fn(),
            onDragEnd: jest.fn(),
        };
    });

    it('renders', () => {
        const component = render(
            <VolumeCtrl
                volume={1}
                isDragging={false}
                className="silverstone"
                {...mockprops}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('50% volume is represented with a half outer circle', () => {
        const component = render(
            <VolumeCtrl
                volume={0.5}
                isDragging={false}
                className="silverstone"
                {...mockprops}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('full vol renders full vol icon', () => {
        const component = render(
            <VolumeCtrl
                volume={1}
                isDragging={false}
                className="silverstone"
                {...mockprops}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('vol <= 0.1 renders muted icon', () => {
        const component = render(
            <VolumeCtrl
                volume={0.1}
                isDragging={false}
                className="silverstone"
                {...mockprops}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('vol < 0.8 && > 0.1 renders medium vol icon', () => {
        const component = render(
            <VolumeCtrl
                volume={0.5}
                isDragging={false}
                className="silverstone"
                {...mockprops}
            />,
        );
        expect(component).toMatchSnapshot();
    });
});
