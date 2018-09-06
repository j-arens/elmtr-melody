import {
    tracks,
    view,
} from '../initialize';
const track = require('@fixtures/track');
const uiActions = require('@mocks/uiActions');
const audioActions = require('@mocks/audioActions');

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
