import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { CYCLE_STATE, RESET_STATE } from './constants';
import initialState from './initialState';
import * as reducers from './reducers';
import { Action, State } from './type';

export default function(
    state: State = initialState,
    action: Action,
): State {
    switch (action.type) {
        case CYCLE_STATE: {
            return reducers.cycleState(state, action);
        }
        case getType(actions.updateCurrentTime): {
            return reducers.updateCurrentTime(state, action);
        }
        case getType(actions.setCurrentTrack): {
            return reducers.setCurrentTrack(state, action);
        }
        case getType(actions.setTracks): {
            return reducers.setTracks(state, action);
        }
        case getType(actions.nextTrack): {
            return reducers.nextTrack(state, action);
        }
        case getType(actions.prevTrack): {
            return reducers.prevTrack(state, action);
        }
        case getType(actions.toggleShuffle): {
            return reducers.toggleShuffle(state, action);
        }
        case getType(actions.toggleRepeat): {
            return reducers.toggleRepeat(state, action);
        }
        case getType(actions.toggleVolDragging): {
            return reducers.toggleVolDragging(state, action);
        }
        case getType(actions.updateVolume): {
            return reducers.updateVolume(state, action);
        }
        case getType(actions.toggleGliderDragging): {
            return reducers.toggleGliderDragging(state, action);
        }
        case getType(actions.triggerTimeSync): {
            return reducers.triggerTimeSync(state, action);
        }
        case getType(actions.toggleDock): {
            return reducers.toggleDock(state, action);
        }
        case getType(actions.speedUp): {
            return reducers.speedUp(state);
        }
        case getType(actions.slowDown): {
            return reducers.slowDown(state);
        }
        case getType(actions.changeView): {
            return reducers.changeView(state, action);
        }
        case getType(actions.setFilelength): {
            return reducers.setFilelength(state, action);
        }
        case RESET_STATE: {
            return reducers.resetState();
        }
        default: {
            return state;
        }
    }
}
