import { View } from '@redux/type';
import { createAction } from 'typesafe-actions';
import * as constants from './constants';
import { DockToggleDims } from './type';
import { create } from 'domain';

export const changeView = createAction(constants.CHANGE_VIEW,
    (view: View) => ({
        type: constants.CHANGE_VIEW,
        payload: view,
    }),
);

export const toggleDock = createAction(constants.TOGGLE_DOCK,
    (dimensions: DockToggleDims) => ({
        type: constants.TOGGLE_DOCK,
        payload: dimensions,
    }),
);

export const toggleVolDragging = createAction(constants.TOGGLE_VOL_DRAGGING,
    () => ({
        type: constants.TOGGLE_VOL_DRAGGING,
    }),
);

export const toggleGliderDragging = createAction(constants.TOGGLE_GLIDER_DRAGGING,
    () => ({
        type: constants.TOGGLE_GLIDER_DRAGGING,
    }),
);

export const setWrapperId = createAction(constants.SET_WRAPPER_ID,
    (id: string) => ({
        type: constants.SET_WRAPPER_ID,
        payload: id,
    }),
);
