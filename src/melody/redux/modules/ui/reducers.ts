import { Action, UiState } from '@redux/type';

/**
 * CHANGE_VIEW
 */
export function changeView(state: UiState, action: Action): UiState {
    const { view } = state;
    const nextView = action.payload;

    if (view === nextView) {
        return state;
    }

    return {
        ...state,
        view: nextView,
    };
}

/**
 * TOGGLE_DOCK
 */
export function toggleDock(state: UiState, action: Action): UiState {
    if (!action.payload) {
        return state;
    }

    return {
        ...state,
        showDock: !state.showDock,
        dockCoordinates: action.payload,
    };
}

/**
 * TOGGLE_GLIDER_DRAGGING
 */
export function toggleGliderDragging(state: UiState, action: Action): UiState {
    return {
        ...state,
        gliderIsDragging: !state.gliderIsDragging,
    };
}

/**
 * TOGGLE_VOL_DRAGGING
 */
export function toggleVolDragging(state: UiState, action: Action): UiState {
    return {
        ...state,
        volIsDragging: !state.volIsDragging,
    };
}
