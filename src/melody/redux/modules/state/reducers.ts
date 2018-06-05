import initialState from '@redux/initialState';
import { Action, State } from '@redux/type';
import StateMachine from '@state-machine/index';
import { MachineStates } from '@state-machine/type';

/**
 * CYCLE_STATE
 */
export function cycleState(state: State, action: Action): State {
    if (!action.payload) {
        return state;
    }

    const machineAction = action.payload;
    const { state: { currentState } } = state;
    const nextState = StateMachine[currentState][machineAction];

    if (!nextState) {
        if (currentState === 'fault') {
            return state;
        }

        const failedState = StateMachine[currentState].FAILED;
        return {
            ...state,
            state: {
                ...state.state,
                currentState: failedState as MachineStates,
                lastState: currentState,
            },
        };
    }

    const newState = {
        ...state,
        state: {
            ...state.state,
            currentState: nextState,
            lastState: currentState,
        },
    };

    return newState;
}

/**
 * RESET_STATE
 */
export function resetState(): State {
    return initialState;
}
