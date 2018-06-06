import initialState from '@redux/initialState';
import { Action, MachineState } from '@redux/type';
import StateMachine from '@state-machine/index';
import { MachineStates } from '@state-machine/type';

/**
 * CYCLE_STATE
 */
export function cycleState(state: MachineState, action: Action): MachineState {
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
 * RESET_STATE
 */
export function resetState(): MachineState {
    return initialState;
}
