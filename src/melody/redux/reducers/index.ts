import { Action, State } from '@redux/type';
import StateMachine from '@state-machine/index';
import { MachineStates } from '@state-machine/type';
import { shuffleTracks } from '@utils/index';
import initialState from '../initialState';

/**
 * CYCLE_STATE
 */
export function cycleState(state: State, action: Action): State {
    if (!action.payload) {
        return state;
    }

    const machineAction = action.payload;
    const { currentState } = state;
    const nextState = StateMachine[currentState][machineAction];

    if (!nextState) {
        if (currentState === 'fault') {
            return state;
        }

        const failedState = StateMachine[currentState].FAILED;
        return {
            ...state,
            currentState: failedState as MachineStates,
            lastState: currentState,
        };
    }

    const newState = {
        ...state,
        currentState: nextState,
        lastState: currentState,
    };

    return newState;
}

/**
 * SET_CURRENT_TRACK
 */
export function setCurrentTrack(state: State, action: Action): State {
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
export function setTracks(state: State, action: Action): State {
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
export function updateCurrentTime(state: State, action: Action): State {
    if (action.payload === undefined) {
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
export function nextTrack(state: State, action: Action): State {
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
export function prevTrack(state: State, action: Action): State {
    const { tracks, currentTrack, lastTrack, shuffle } = state;

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
export function toggleShuffle(state: State, action: Action): State {
    return {
        ...state,
        shuffle: !state.shuffle,
    };
}

/**
 * TOGGLE_REPEAT
 */
export function toggleRepeat(state: State, action: Action): State {
    return {
        ...state,
        repeat: !state.repeat,
    };
}

/**
 * TOGGLE_VOL_DRAGGING
 */
export function toggleVolDragging(state: State, action: Action): State {
    return {
        ...state,
        ui: {
            ...state.ui,
            volIsDragging: !state.ui.volIsDragging,
        },
    };
}

/**
 * TOGGLE_GLIDER_DRAGGING
 */
export function toggleGliderDragging(state: State, action: Action): State {
    return {
        ...state,
        ui: {
            ...state.ui,
            gliderIsDragging: !state.ui.gliderIsDragging,
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
export function triggerTimeSync(state: State, action: Action): State {
    return {
        ...state,
        timeSync: state.timeSync + 1,
    };
}

/**
 * RESET_STATE
 */
export function resetState(): State {
    return initialState;
}

/**
 * TOGGLE_DOCK
 */
export function toggleDock(state: State, action: Action): State {
    return {
        ...state,
        ui: {
            ...state.ui,
            showDock: !state.ui.showDock,
        },
    };
}

/**
 * SPEED_UP
 */
export function speedUp(state: State): State {
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
export function slowDown(state: State): State {
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
 * CHANGE_VIEW
 */
export function changeView(state: State, action: Action): State {
    const { ui: view } = state;
    const nextView = action.payload;

    if (view === nextView) {
        return state;
    }

    return {
        ...state,
        ui: {
            ...state.ui,
            view: nextView,
        },
    };
}
