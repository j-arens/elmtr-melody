import { MachineAction } from '@state-machine/type';
import { createAction } from 'typesafe-actions';
import * as constants from './constants';

export const cycleState = createAction(constants.CYCLE_STATE,
    (machineAction: MachineAction) => ({
        type: constants.CYCLE_STATE,
        payload: machineAction,
    }),
);
