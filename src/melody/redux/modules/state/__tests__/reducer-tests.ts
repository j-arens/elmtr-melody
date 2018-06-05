import initialState from '@redux/initialState';
import { MachineStates } from '@redux/state-machine/type';
import * as actions from '../actions';
import { CYCLE_STATE } from '../constants';
import reducer from '../index';
const tracks = require('@tracks');

describe('CYCLE_STATE', () => {
    it('cycles the state machine', () => {
        const action = {
            type: CYCLE_STATE,
            payload: 'SUCCESS',
        };

        const state = {
            ...initialState,
            state: {
                ...initialState.currentState,
                currentState: 'fetching' as MachineStates,
                lastState: 'stopped' as MachineStates,
            },
        };

        const newState = reducer(state, action);
        expect(newState.state.currentState).toBe('stopped');
        expect(newState.state.lastState).toBe('fetching');
    });

    it('cycles to fault if invalid transition', () => {
        const action = {
            type: CYCLE_STATE,
            payload: 'PLAY',
        };

        const state = {
            ...initialState,
            state: {
                ...initialState.state,
                currentState: 'fetching' as MachineStates,
                lastState: 'stopped' as MachineStates,
            },
        };

        const newState = reducer(state, action);
        expect(newState.state.currentState).toBe('fault');
        expect(newState.state.lastState).toBe('fetching');
    });
});

describe('RESET_STATE', () => {
    it('should reset state to initialState', () => {
        const action = actions.resetState();
        const state = {
            ...initialState,
            shuffle: true,
            currentTrack: 4,
            lastTrack: 1,
            tracks,
        };
        const newState = reducer(state, action);
        expect(newState).toEqual(initialState);
    });
});
