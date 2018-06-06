import { View } from '@redux/type';
import { createAction } from 'typesafe-actions';
import * as constants from './constants';

export const setCurrentTrack = createAction(constants.SET_CURRENT_TRACK,
    (index: number) => ({
        type: constants.SET_CURRENT_TRACK,
        payload: index,
    }),
);

export const setTracks = createAction(constants.SET_TRACKS,
    (tracks: object[]) => ({
        type: constants.SET_TRACKS,
        payload: tracks,
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

export const setFilelength = createAction(constants.SET_FILE_LENGTH,
    (filelength: number) => ({
        type: constants.SET_FILE_LENGTH,
        payload: filelength,
    }),
);
