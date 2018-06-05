import initialState from '@redux/initialState';
import * as actions from '../actions';
import reducer from '../index';

describe('TOGGLE_VOL_DRAGGING', () => {
    it('should toggle volIsDragging flag', () => {
        const action = actions.toggleVolDragging();
        const newState = reducer(initialState, action);
        expect(newState.ui.volIsDragging).toBe(true);
    });
});

describe('TOGGLE_GLIDER_DRAGGING', () => {
    it('should toggle gliderIsDragging flag', () => {
        const action = actions.toggleGliderDragging();
        const newState = reducer(initialState, action);
        expect(newState.ui.gliderIsDragging).toBe(true);
    });
});

describe('TOGGLE_DOCK', () => {
    it('should toggle showing the dock', () => {
        const action = actions.toggleDock();
        const newState = reducer(initialState, action);
        expect(newState.ui.showDock).toBe(true);
    });
});

describe('CHANGE_VIEW', () => {
    it('should change the view', () => {
        const action = actions.changeView('simple-toolbar');
        const newState = reducer(initialState, action);
        expect(newState.ui.view).toBe('simple-toolbar');
    });

    it('should bail if payload matches the current view', () => {
        const action = actions.changeView('slider');
        const newState = reducer(initialState, action);
        expect(newState).toEqual(initialState);
    });
});
