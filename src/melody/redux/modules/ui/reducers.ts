import { Action, State } from '@redux/type';

/**
 * CHANGE_VIEW
 */
export function changeView(state: State, action: Action): State {
    const { ui: view } = state;
    const nextView = action.payload;

    if (view === nextView) {
        return state;
    }

    return {
        ...state,
        ui: {
            ...state.ui,
            view: nextView,
        },
    };
}

/**
 * TOGGLE_DOCK
 */
export function toggleDock(state: State, action: Action): State {
    return {
        ...state,
        ui: {
            ...state.ui,
            showDock: !state.ui.showDock,
        },
    };
}

/**
 * TOGGLE_GLIDER_DRAGGING
 */
export function toggleGliderDragging(state: State, action: Action): State {
    return {
        ...state,
        ui: {
            ...state.ui,
            gliderIsDragging: !state.ui.gliderIsDragging,
        },
    };
}

/**
 * TOGGLE_VOL_DRAGGING
 */
export function toggleVolDragging(state: State, action: Action): State {
    return {
        ...state,
        ui: {
            ...state.ui,
            volIsDragging: !state.ui.volIsDragging,
        },
    };
}
