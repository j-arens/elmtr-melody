import { compose } from '../helpers';
import {
    tracks,
    view,
} from '../index';
const track = require('@fixtures/track');
const uiActions = require('@mocks/uiActions');
const audioActions = require('@mocks/audioActions');

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
        wrapper_id: 'abc123',
    };

    describe('view', () => {
        it('sets the view and the wrapper id', () => {
            const returnValue = view({ dispatch, config });
            expect(dispatch).toHaveBeenCalled();
            expect(uiActions.changeView).toHaveBeenCalled();
            expect(uiActions.changeView.mock.calls[0][0]).toBe('slider');
            expect(uiActions.setWrapperId).toHaveBeenCalled();
            expect(uiActions.setWrapperId.mock.calls[0][0]).toBe('abc123');
            expect(returnValue).toMatchObject({ dispatch, config });
        });
    });

    describe('tracks', () => {
        it('prepares and sets the tracks', () => {
            const returnValue = tracks({ dispatch, config });
            expect(dispatch).toHaveBeenCalled();
            expect(audioActions.setTracks).toHaveBeenCalled();
            expect(returnValue).toMatchObject({ dispatch, config });
        });
    });
});
