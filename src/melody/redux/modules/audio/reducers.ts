import { Action, AudioState } from '@redux/type';
import { shuffleTracks } from '@utils/index';

/**
 * SET_CURRENT_TRACK
 */
export function setCurrentTrack(state: AudioState, action: Action): AudioState {
    if (!action.payload) {
        return state;
    }

    const newIndex = action.payload;
    const { currentTrack, tracks } = state;

    if (newIndex < 0 || newIndex > (tracks.length - 1) || currentTrack === newIndex) {
        return state;
    }

    return {
        ...state,
        currentTrack: newIndex,
    };
}

/**
 * SET_TRACKS
 */
export function setTracks(state: AudioState, action: Action): AudioState {
    if (!action.payload) {
        return state;
    }

    return {
        ...state,
        tracks: action.payload,
    };
}

/**
 * UPDATE_CURRENT_TIME
 */
export function updateCurrentTime(state: AudioState, action: Action): AudioState {
    if (!action.payload && action.payload !== 0) {
        return state;
    }

    return {
        ...state,
        currentTime: action.payload,
    };
}

/**
 * NEXT_TRACK
 */
export function nextTrack(state: AudioState, action: Action): AudioState {
    const { tracks, currentTrack, shuffle } = state;

    if (shuffle) {
        return {
            ...state,
            lastTrack: currentTrack,
            currentTrack: shuffleTracks(tracks, currentTrack),
        };
    }

    let index = currentTrack + 1;
    if (index > (tracks.length - 1)) {
        index = 0;
    }

    return {
        ...state,
        lastTrack: currentTrack,
        currentTrack: index,
    };
}

/**
 * PREV_TRACK
 */
export function prevTrack(state: AudioState, action: Action): AudioState {
    const { tracks, currentTrack, lastTrack, shuffle } = state;

    if (tracks.length < 2) {
        return {
            ...state,
            currentTime: 0,
            timeSync: state.timeSync + 1,
        };
    }

    if (shuffle) {
        return {
            ...state,
            lastTrack: currentTrack,
            currentTrack: lastTrack,
        };
    }

    let index = currentTrack - 1;
    if (index < 0) {
        index = tracks.length - 1;
    }

    return {
        ...state,
        lastTrack: currentTrack,
        currentTrack: index,
    };
}

/**
 * TOGGLE_SHUFFLE
 */
export function toggleShuffle(state: AudioState, action: Action): AudioState {
    return {
        ...state,
        shuffle: !state.shuffle,
    };
}

/**
 * TOGGLE_REPEAT
 */
export function toggleRepeat(state: AudioState, action: Action): AudioState {
    return {
        ...state,
        repeat: !state.repeat,
    };
}

/**
 * UPDATE_VOLUME
 */
export function updateVolume(state: AudioState, action: Action): AudioState {
    if (!action.payload === undefined) {
        return state;
    }

    const newLevel = action.payload;

    if (state.volume === newLevel) {
        return state;
    }

    return {
        ...state,
        volume: Number(newLevel.toFixed(4)),
    };
}

/**
 * TRIGGER_TIME_SYNC
 */
export function triggerTimeSync(state: AudioState, action: Action): AudioState {
    return {
        ...state,
        timeSync: state.timeSync + 1,
    };
}

/**
 * SPEED_UP
 */
export function speedUp(state: AudioState): AudioState {
    const { playbackRate } = state;

    if (playbackRate === 2) {
        return state;
    }

    return {
        ...state,
        playbackRate: playbackRate + 0.25,
    };
}

/**
 * SLOW_DOWN
 */
export function slowDown(state: AudioState): AudioState {
    const { playbackRate } = state;

    if (playbackRate === 0.5) {
        return state;
    }

    return {
        ...state,
        playbackRate: playbackRate - 0.25,
    };
}

/**
 * SET_FILE_LENGTH
 */
export function setFilelength(state: AudioState, action: Action): AudioState {
    if (!action.payload || isNaN(action.payload)) {
        return state;
    }

    return {
        ...state,
        filelength: Math.round(action.payload),
    };
}
