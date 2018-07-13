import initialState from '@redux/initialState';
import * as actions from '../actions';
import reducer from '../index';

describe('TOGGLE_VOL_DRAGGING', () => {
    it('should toggle volIsDragging flag', () => {
        const action = actions.toggleVolDragging();
        const newState = reducer(initialState.ui, action);
        expect(newState.volIsDragging).toBe(true);
    });
});

describe('TOGGLE_GLIDER_DRAGGING', () => {
    it('should toggle gliderIsDragging flag', () => {
        const action = actions.toggleGliderDragging();
        const newState = reducer(initialState.ui, action);
        expect(newState.gliderIsDragging).toBe(true);
    });
});

describe('TOGGLE_DOCK', () => {
    it('should toggle showing the dock', () => {
        const action = actions.toggleDock({
            width: 10,
            x: 100,
            y: 100,
        });
        const newState = reducer(initialState.ui, action);
        expect(newState.showDock).toBe(true);
    });
});

describe('CHANGE_VIEW', () => {
    it('should change the view', () => {
        const action = actions.changeView('simple-toolbar');
        const newState = reducer(initialState.ui, action);
        expect(newState.view).toBe('simple-toolbar');
    });

    it('should bail if payload matches the current view', () => {
        const action = actions.changeView('slider');
        const newState = reducer(initialState.ui, action);
        expect(newState).toEqual(initialState.ui);
    });
});
