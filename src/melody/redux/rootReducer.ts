import audioReducer from '@redux/modules/audio';
import machineReducer from '@redux/modules/machine';
import uiReducer from '@redux/modules/ui';
import { combineReducers } from 'redux';

export default combineReducers({
    machine: machineReducer,
    audio: audioReducer,
    ui: uiReducer,
});
