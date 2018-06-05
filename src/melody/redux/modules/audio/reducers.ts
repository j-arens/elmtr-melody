import { Action, State } from '@redux/type';
import { shuffleTracks } from '@utils/index';

/**
 * SET_CURRENT_TRACK
 */
export function setCurrentTrack(state: State, action: Action): State {
    if (!action.payload) {
        return state;
    }

    const newIndex = action.payload;
    const { audio: { currentTrack, tracks } } = state;

    if (newIndex < 0 || newIndex > (tracks.length - 1) || currentTrack === newIndex) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            currentTrack: newIndex,
        },
    };
}

/**
 * SET_TRACKS
 */
export function setTracks(state: State, action: Action): State {
    if (!action.payload) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            tracks: action.payload,
        },
    };
}

/**
 * UPDATE_CURRENT_TIME
 */
export function updateCurrentTime(state: State, action: Action): State {
    if (action.payload === undefined) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            currentTime: action.payload,
        },
    };
}

/**
 * NEXT_TRACK
 */
export function nextTrack(state: State, action: Action): State {
    const { audio: { tracks, currentTrack, shuffle } } = state;

    if (shuffle) {
        return {
            ...state,
            audio: {
                ...state.audio,
                lastTrack: currentTrack,
                currentTrack: shuffleTracks(tracks, currentTrack),
            },
        };
    }

    let index = currentTrack + 1;
    if (index > (tracks.length - 1)) {
        index = 0;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            lastTrack: currentTrack,
            currentTrack: index,
        },
    };
}

/**
 * PREV_TRACK
 */
export function prevTrack(state: State, action: Action): State {
    const { audio: { tracks, currentTrack, lastTrack, shuffle } } = state;

    if (shuffle) {
        return {
            ...state,
            audio: {
                ...state.audio,
                lastTrack: currentTrack,
                currentTrack: lastTrack,
            },
        };
    }

    let index = currentTrack - 1;
    if (index < 0) {
        index = tracks.length - 1;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            lastTrack: currentTrack,
            currentTrack: index,
        },
    };
}

/**
 * TOGGLE_SHUFFLE
 */
export function toggleShuffle(state: State, action: Action): State {
    return {
        ...state,
        audio: {
            ...state.audio,
            shuffle: !state.audio.shuffle,
        },
    };
}

/**
 * TOGGLE_REPEAT
 */
export function toggleRepeat(state: State, action: Action): State {
    return {
        ...state,
        audio: {
            ...state.audio,
            repeat: !state.audio.repeat,
        },
    };
}

/**
 * UPDATE_VOLUME
 */
export function updateVolume(state: State, action: Action): State {
    if (!action.payload === undefined) {
        return state;
    }

    const newLevel = action.payload;

    if (state.audio.volume === newLevel) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            volume: Number(newLevel.toFixed(4)),
        },
    };
}

/**
 * TRIGGER_TIME_SYNC
 */
export function triggerTimeSync(state: State, action: Action): State {
    return {
        ...state,
        audio: {
            ...state.audio,
            timeSync: state.audio.timeSync + 1,
        },
    };
}

/**
 * SPEED_UP
 */
export function speedUp(state: State): State {
    const { audio: { playbackRate } } = state;

    if (playbackRate === 2) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            playbackRate: playbackRate + 0.25,
        },
    };
}

/**
 * SLOW_DOWN
 */
export function slowDown(state: State): State {
    const { audio: { playbackRate } } = state;

    if (playbackRate === 0.5) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            playbackRate: playbackRate - 0.25,
        },
    };
}

/**
 * SET_FILE_LENGTH
 */
export function setFilelength(state: State, action: Action): State {
    if (!action.payload) {
        return state;
    }

    if (isNaN(action.payload)) {
        return state;
    }

    return {
        ...state,
        audio: {
            ...state.audio,
            filelength: Math.round(action.payload),
        },
    };
}
