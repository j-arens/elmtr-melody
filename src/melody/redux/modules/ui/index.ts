import initialState from '@redux/initialState';
import { Action, UiState } from '@redux/type';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import * as reducers from './reducers';

export default function(
    state: UiState = initialState.ui,
    action: Action,
): UiState {
    switch (action.type) {
        case getType(actions.changeView): {
            return reducers.changeView(state, action);
        }
        case getType(actions.toggleDock): {
            return reducers.toggleDock(state, action);
        }
        case getType(actions.toggleGliderDragging): {
            return reducers.toggleGliderDragging(state, action);
        }
        case getType(actions.toggleVolDragging): {
            return reducers.toggleVolDragging(state, action);
        }
        default: {
            return state;
        }
    }
}