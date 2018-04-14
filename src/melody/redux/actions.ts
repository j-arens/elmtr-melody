import { MachineAction } from '@state-machine/type';
import { timeout } from '@utils/index';
import { create } from 'domain';
import { ThunkAction } from 'redux-thunk';
import { createAction } from 'typesafe-actions';
import * as constants from './constants';
import { State, View } from './type';

/*
there are cases (loading new track during playback) where consecutive
cycleState() calls are made in rapid order. as far as I can tell
preact isn't diffing new props fast enough in this situation for
lifecycle methods to be dependable, so for now this action returns a promise
to ensure cycleState() calls are (optionally) fully processed before the next one fires
*/
export function cycleState(machineAction: MachineAction) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                dispatch({
                    type: constants.CYCLE_STATE,
                    payload: machineAction,
                });
                resolve();
            } catch (e) {
                reject(Error(e));
            }
        });
    };
}

export const setTracks = createAction(constants.SET_TRACKS,
    (tracks: object[]) => ({
        type: constants.SET_TRACKS,
        payload: tracks,
    }),
);

export const setCurrentTrack = createAction(constants.SET_CURRENT_TRACK,
    (index: number) => ({
        type: constants.SET_CURRENT_TRACK,
        payload: index,
    }),
);

export const updateCurrentTime = createAction(constants.UPDATE_CURRENT_TIME,
    (nextTime: number) => ({
        type: constants.UPDATE_CURRENT_TIME,
        payload: nextTime,
    }),
);

export const nextTrack = createAction(constants.NEXT_TRACK,
    () => ({
        type: constants.NEXT_TRACK,
    }),
);

// export const nextTrackThunk = () =>
//     (dispatch, getState) => {
//         const { currentTrack, tracks, currentState } = getState();
//         if (currentTrack === (tracks.length - 1)) {
//             if (currentState === 'playing') {
//                 dispatch(cycleState('STOP'));
//             }
//             dispatch(setCurrentTrack(0));
//             dispatch(updateCurrentTime(0));
//             dispatch(triggerTimeSync());
//         } else {
//             dispatch(nextTrack());
//         }
//     };

export const prevTrack = createAction(constants.PREV_TRACK,
    () => ({
        type: constants.PREV_TRACK,
    }),
);

export const toggleShuffle = createAction(constants.TOGGLE_SHUFFLE,
    () => ({
        type: constants.TOGGLE_SHUFFLE,
    }),
);

export const toggleRepeat = createAction(constants.TOGGLE_REPEAT,
    () => ({
        type: constants.TOGGLE_REPEAT,
    }),
);

export const toggleVolDragging = createAction(constants.TOGGLE_VOL_DRAGGING,
    () => ({
        type: constants.TOGGLE_VOL_DRAGGING,
    }),
);

export const toggleGliderDragging = createAction(constants.TOGGLE_GLIDER_DRAGGING,
    () => ({
        type: constants.TOGGLE_GLIDER_DRAGGING,
    }),
);

export const updateVolume = createAction(constants.UPDATE_VOLUME,
    (newLevel: number) => ({
        type: constants.UPDATE_VOLUME,
        payload: newLevel,
    }),
);

export const triggerTimeSync = createAction(constants.TRIGGER_TIME_SYNC,
    () => ({
        type: constants.TRIGGER_TIME_SYNC,
    }),
);

export const resetState = () => ({
    type: constants.RESET_STATE,
});

export const toggleDock = createAction(constants.TOGGLE_DOCK,
    () => ({
        type: constants.TOGGLE_DOCK,
    }),
);

export const speedUp = createAction(constants.SPEED_UP,
    () => ({
        type: constants.SPEED_UP,
    }),
);

export const slowDown = createAction(constants.SLOW_DOWN,
    () => ({
        type: constants.SLOW_DOWN,
    }),
);

export const changeView = createAction(constants.CHANGE_VIEW,
    (view: View) => ({
        type: constants.CHANGE_VIEW,
        payload: view,
    }),
);
