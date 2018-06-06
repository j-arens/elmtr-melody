import initialState from '@redux/initialState';
import { Action, MachineState } from '@redux/type';
import * as actions from './actions';
import { CYCLE_STATE } from './constants';
import * as reducers from './reducers';

export default function(
    state: MachineState = initialState.machine,
    action: Action,
): MachineState {
    switch (action.type) {
        case CYCLE_STATE: {
            return reducers.cycleState(state, action);
        }
        default: {
            return state;
        }
    }
}
