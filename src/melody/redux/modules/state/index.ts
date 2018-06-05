import { Action, State } from '@redux/type';
import initialState from '@redux/initialState';
import * as actions from './actions';
import * as reducers from './reducers';
import { CYCLE_STATE, RESET_STATE } from './constants';

export default function (
    state: State = initialState,
    action: Action,
): State {
    switch(action.type) {
        case CYCLE_STATE: {
            return reducers.cycleState(state, action);
        }
        case RESET_STATE: {
            return reducers.resetState();
        }
        default: {
            return state;
        }
    }
}
