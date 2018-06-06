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
            ...initialState.machine,
            currentState: 'fetching' as MachineStates,
            lastState: 'stopped' as MachineStates,
        };

        const newState = reducer(state, action);
        expect(newState.currentState).toBe('stopped');
        expect(newState.lastState).toBe('fetching');
    });

    it('cycles to fault if invalid transition', () => {
        const action = {
            type: CYCLE_STATE,
            payload: 'PLAY',
        };

        const state = {
            ...initialState.machine,
            currentState: 'fetching' as MachineStates,
            lastState: 'stopped' as MachineStates,
        };

        const newState = reducer(state, action);
        expect(newState.currentState).toBe('fault');
        expect(newState.lastState).toBe('fetching');
    });
});
