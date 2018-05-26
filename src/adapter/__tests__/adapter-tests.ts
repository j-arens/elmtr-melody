import { compose } from '../helpers';
import {
    reset,
    tracks,
    view,
} from '../index';
const track = require('@fixtures/track');
const mockactions = require('@mocks/actions');

describe('compose', () => {
    it('composes', () => {
        const fn1 = jest.fn().mockReturnValue(1);
        const fn2 = jest.fn().mockReturnValue(2);
        const fn3 = jest.fn().mockReturnValue(3);
        const composed = compose(fn1, fn2, fn3);
        const result = composed(0);
        expect(fn1).toHaveBeenCalledWith(0);
        expect(fn2).toHaveBeenCalledWith(1);
        expect(fn3).toHaveBeenCalledWith(2);
        expect(result).toBe(3);
    });
});

describe('initialize middlewares', () => {
    const dispatch = jest.fn();
    const config = {
        melody_audio_tracks: [track],
        melody_component_style: 'slider',
    };

    describe('reset', () => {
        it('resets the state', () => {
            const returnVal = reset({ dispatch, config });
            expect(dispatch).toHaveBeenCalled();
            expect(mockactions.resetState).toHaveBeenCalled();
            expect(returnVal).toMatchObject({ dispatch, config });
        });
    });

    describe('view', () => {
        it('sets the view', () => {
            const returnValue = view({ dispatch, config });
            expect(dispatch).toHaveBeenCalled();
            expect(mockactions.changeView).toHaveBeenCalled();
            expect(mockactions.changeView.mock.calls[0][0]).toBe('slider');
            expect(returnValue).toMatchObject({ dispatch, config });
        });
    });

    describe('tracks', () => {
        it('prepares and sets the tracks', () => {
            const returnValue = tracks({ dispatch, config });
            expect(dispatch).toHaveBeenCalled();
            expect(mockactions.setTracks).toHaveBeenCalled();
            expect(returnValue).toMatchObject({ dispatch, config });
        });
    });
});
