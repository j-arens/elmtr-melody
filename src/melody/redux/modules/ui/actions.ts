import { createAction } from 'typesafe-actions';
import { View } from '@redux/type';
import * as constants from './constants';

export const changeView = createAction(constants.CHANGE_VIEW,
    (view: View) => ({
        type: constants.CHANGE_VIEW,
        payload: view,
    }),
);

export const toggleDock = createAction(constants.TOGGLE_DOCK,
    () => ({
        type: constants.TOGGLE_DOCK,
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
