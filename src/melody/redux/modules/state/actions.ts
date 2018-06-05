import * as constants from './constants';
import { MachineAction } from '@state-machine/type';

/*
there are cases (loading new track during playback) where consecutive
cycleState() calls are made in rapid order. as far as I can tell
preact isn't diffing new props fast enough in this situation for
lifecycle methods to be dependable, so for now this action returns a promise
to ensure cycleState() calls are (optionally) fully processed before the next one fires
*/
export function cycleState(machineAction: MachineAction) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                dispatch({
                    type: constants.CYCLE_STATE,
                    payload: machineAction,
                });
                resolve();
            } catch (e) {
                reject(Error(e));
            }
        });
    };
}

export const resetState = () => ({
    type: constants.RESET_STATE,
});
