import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { ErrorCodes } from '../codes';
import ErrorHandler from '../ErrorHandler';

describe('ErrorHandler', () => {
    it('renders BadSource component if error codes contains bad source error', () => {
        const errors = new Set([ErrorCodes.MELODY_BAD_SOURCE]);
        const component = render(<ErrorHandler errors={errors} />);
        expect(component).toMatchSnapshot();
    });

    it('renders NoTracksEditor component if there are no tracks and user is in edit mode', () => {
        global.elementor = {
            isEditMode: jest.fn().mockReturnValue(true),
        };
        const errors = new Set([ErrorCodes.MELODY_NO_TRACKS]);
        const component = render(<ErrorHandler errors={errors} />);
        expect(component).toMatchSnapshot();
    });

    it('render NoTracksFront component if there are no tracks and user is not in edit mode', () => {
        global.elementor = {
            isEditMode: jest.fn().mockReturnValue(false),
        };
        const errors = new Set([ErrorCodes.MELODY_NO_TRACKS]);
        const component = render(<ErrorHandler errors={errors} />);
        expect(component).toMatchSnapshot();
    });

    it('renders DefaultError component for unhandled errors', () => {
        const errors = new Set([9999]);
        const component = render(<ErrorHandler errors={errors} />);
        expect(component).toMatchSnapshot();
    });
});
