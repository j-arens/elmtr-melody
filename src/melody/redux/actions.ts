import { MachineAction } from '@state-machine/type';
import { timeout } from '@utils/index';
import { create } from 'domain';
import { ThunkAction } from 'redux-thunk';
import { createAction } from 'typesafe-actions';
import {
    CYCLE_STATE,
    DELETE_CUSTOM_PROP,
    EDIT_CUSTOM_PROPS,
    NEXT_TRACK,
    PREV_TRACK,
    RESET_STATE,
    SET_CURRENT_TRACK,
    SET_TRACKS,
    SLOW_DOWN,
    SPEED_UP,
    TOGGLE_DOCK,
    TOGGLE_GLIDER_DRAGGING,
    TOGGLE_REPEAT,
    TOGGLE_SHUFFLE,
    TOGGLE_VOL_DRAGGING,
    TRIGGER_TIME_SYNC,
    UPDATE_CURRENT_TIME,
    UPDATE_VOLUME,
    CHANGE_VIEW,
} from './constants';
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
                    type: CYCLE_STATE,
                    payload: machineAction,
                });
                resolve();
            } catch (e) {
                reject(Error(e));
            }
        });
    };
}

export const setTracks = createAction(SET_TRACKS,
    (tracks: object[]) => ({
        type: SET_TRACKS,
        payload: tracks,
    }),
);

export const setCurrentTrack = createAction(SET_CURRENT_TRACK,
    (index: number) => ({
        type: SET_CURRENT_TRACK,
        payload: index,
    }),
);

export const updateCurrentTime = createAction(UPDATE_CURRENT_TIME,
    (nextTime: number) => ({
        type: UPDATE_CURRENT_TIME,
        payload: nextTime,
    }),
);

export const nextTrack = createAction(NEXT_TRACK,
    () => ({
        type: NEXT_TRACK,
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

export const prevTrack = createAction(PREV_TRACK,
    () => ({
        type: PREV_TRACK,
    }),
);

export const toggleShuffle = createAction(TOGGLE_SHUFFLE,
    () => ({
        type: TOGGLE_SHUFFLE,
    }),
);

export const toggleRepeat = createAction(TOGGLE_REPEAT,
    () => ({
        type: TOGGLE_REPEAT,
    }),
);

export const toggleVolDragging = createAction(TOGGLE_VOL_DRAGGING,
    () => ({
        type: TOGGLE_VOL_DRAGGING,
    }),
);

export const toggleGliderDragging = createAction(TOGGLE_GLIDER_DRAGGING,
    () => ({
        type: TOGGLE_GLIDER_DRAGGING,
    }),
);

export const updateVolume = createAction(UPDATE_VOLUME,
    (newLevel: number) => ({
        type: UPDATE_VOLUME,
        payload: newLevel,
    }),
);

export const triggerTimeSync = createAction(TRIGGER_TIME_SYNC,
    () => ({
        type: TRIGGER_TIME_SYNC,
    }),
);

export const editCustomProperties = createAction(EDIT_CUSTOM_PROPS,
    (properties: object) => ({
        type: EDIT_CUSTOM_PROPS,
        payload: properties,
    }),
);

export const deleteCustomProperty = createAction(DELETE_CUSTOM_PROP,
    (key: string) => ({
        type: DELETE_CUSTOM_PROP,
        payload: key,
    }),
);

export const resetState = () => ({
    type: RESET_STATE,
});

export const toggleDock = createAction(TOGGLE_DOCK,
    () => ({
        type: TOGGLE_DOCK,
    }),
);

export const speedUp = createAction(SPEED_UP,
    () => ({
        type: SPEED_UP,
    }),
);

export const slowDown = createAction(SLOW_DOWN,
    () => ({
        type: SLOW_DOWN,
    }),
);

export const changeView = createAction(CHANGE_VIEW,
    (view: View) => ({
        type: CHANGE_VIEW,
        payload: view,
    }),
);
