import audioReducer from '@redux/modules/audio';
import stateReducer from '@redux/modules/state';
import uiReducer from '@redux/modules/ui';
import { combineReducers } from 'redux';

export default combineReducers({
    state: stateReducer,
    audio: audioReducer,
    ui: uiReducer,
});
