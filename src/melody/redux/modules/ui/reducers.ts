import { GLOBAL } from '@melody/constants';
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
    const { jQuery: $ } = GLOBAL;
    const { payload } = action;
    const { wrapperId, showDock } = state;
    const app = document.getElementById(`melody-widgetRoot:${wrapperId}`);
    const appRect = $(app)
        .closest('.elementor-section')
        .get(0)
        .getBoundingClientRect();
    const toggleRect = (payload as HTMLElement).getBoundingClientRect();
    const dockCoordinates = {
        width: toggleRect.width,
        x: toggleRect.left - appRect.left,
        y: toggleRect.bottom - appRect.top,
    };
    return {
        ...state,
        dockCoordinates,
        showDock: !showDock,
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
