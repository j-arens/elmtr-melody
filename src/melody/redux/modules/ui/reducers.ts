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
 * TOGGLE_COMPONENT_DRAGGING
 */
export function toggleComponentDragging(state: UiState, action: Action): UiState {
    if (!action.payload) {
        return state;
    }
    const { payload: { component, isDragging } } = action;
    return {
        ...state,
        dragging: {
            ...state.dragging,
            [component]: isDragging,
        },
    };
}

/**
 * SET_WRAPPER_ID
 */
export function setWrapperId(state: UiState, action: Action): UiState {
    if (!action.payload) {
        return state;
    }
    return {
        ...state,
        wrapperId: action.payload,
    };
}
