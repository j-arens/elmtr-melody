import { getType } from 'typesafe-actions';
import {
    cycleState,
    deleteCustomProperty,
    editCustomProperties,
    nextTrack,
    prevTrack,
    resetState,
    setCurrentTrack,
    setTracks,
    slowDown,
    speedUp,
    toggleDock,
    toggleGliderDragging,
    toggleRepeat,
    toggleShuffle,
    toggleVolDragging,
    triggerTimeSync,
    updateCurrentTime,
    updateVolume,
    changeView,
} from './actions';
import initialState from './initialState';
import {
    cycleStateReducer,
    deleteCustomPropReducer,
    editCustomPropsReducer,
    nextTrackReducer,
    prevTrackReducer,
    resetStateReducer,
    setCurrentTrackReducer,
    setTracksReducer,
    slowDownReducer,
    speedUpReducer,
    toggleDockReducer,
    toggleGliderDraggingReducer,
    toggleRepeatReducer,
    toggleShuffleReducer,
    toggleVolDraggingReducer,
    triggerTimeSyncReducer,
    updateCurrentTimeReducer,
    updateVolumeReducer,
    changeViewReducer,
} from './reducers';
import { Action, State } from './type';

import { CYCLE_STATE, RESET_STATE } from './constants';

export default function(
    state: State = initialState,
    action: Action,
): State {
    switch (action.type) {
        case CYCLE_STATE: {
            return cycleStateReducer(state, action);
        }
        case getType(updateCurrentTime): {
            return updateCurrentTimeReducer(state, action);
        }
        case getType(setCurrentTrack): {
            return setCurrentTrackReducer(state, action);
        }
        case getType(setTracks): {
            return setTracksReducer(state, action);
        }
        case getType(nextTrack): {
            return nextTrackReducer(state, action);
        }
        case getType(prevTrack): {
            return prevTrackReducer(state, action);
        }
        case getType(toggleShuffle): {
            return toggleShuffleReducer(state, action);
        }
        case getType(toggleRepeat): {
            return toggleRepeatReducer(state, action);
        }
        case getType(toggleVolDragging): {
            return toggleVolDraggingReducer(state, action);
        }
        case getType(updateVolume): {
            return updateVolumeReducer(state, action);
        }
        case getType(toggleGliderDragging): {
            return toggleGliderDraggingReducer(state, action);
        }
        case getType(triggerTimeSync): {
            return triggerTimeSyncReducer(state, action);
        }
        case getType(editCustomProperties): {
            return editCustomPropsReducer(state, action);
        }
        case getType(deleteCustomProperty): {
            return deleteCustomPropReducer(state, action);
        }
        case getType(toggleDock): {
            return toggleDockReducer(state, action);
        }
        case getType(speedUp): {
            return speedUpReducer(state);
        }
        case getType(slowDown): {
            return slowDownReducer(state);
        }
        case getType(changeView): {
            return changeViewReducer(state, action);
        }
        case RESET_STATE: {
            return resetStateReducer();
        }
        default: {
            return state;
        }
    }
}
