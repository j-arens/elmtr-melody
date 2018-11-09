import initialState from '@redux/initialState';
import { Action, MachineState } from '@redux/type';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import * as reducers from './reducers';

export default function(
    state: MachineState = initialState.machine,
    action: Action,
): MachineState {
    switch (action.type) {
        case getType(actions.cycleState): {
            return reducers.cycleState(state, action);
        }
        default: {
            return state;
        }
    }
}
