import initialState from '@redux/initialState';
import { Action, AudioState } from '@redux/type';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import * as reducers from './reducers';

export default function(
    state: AudioState = initialState.audio,
    action: Action,
): AudioState {
    switch (action.type) {
        case getType(actions.setCurrentTrack): {
            return reducers.setCurrentTrack(state, action);
        }
        case getType(actions.setTracks): {
            return reducers.setTracks(state, action);
        }
        case getType(actions.updateCurrentTime): {
            return reducers.updateCurrentTime(state, action);
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
        case getType(actions.updateVolume): {
            return reducers.updateVolume(state, action);
        }
        case getType(actions.triggerTimeSync): {
            return reducers.triggerTimeSync(state, action);
        }
        case getType(actions.speedUp): {
            return reducers.speedUp(state);
        }
        case getType(actions.slowDown): {
            return reducers.slowDown(state);
        }
        case getType(actions.setFilelength): {
            return reducers.setFilelength(state, action);
        }
        default: {
            return state;
        }
    }
}
