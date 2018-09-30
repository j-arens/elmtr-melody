import { View } from '@redux/type';
import { create } from 'domain';
import { createAction } from 'typesafe-actions';
import * as constants from './constants';
import { DockToggleDims } from './type';

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

export const toggleComponentDragging = createAction(constants.TOGGLE_COMPONENT_DRAGGING,
    (component: string, isDragging: boolean) => ({
        type: constants.TOGGLE_COMPONENT_DRAGGING,
        payload: {
            component,
            isDragging,
        },
    }),
);

export const setWrapperId = createAction(constants.SET_WRAPPER_ID,
    (id: string) => ({
        type: constants.SET_WRAPPER_ID,
        payload: id,
    }),
);
