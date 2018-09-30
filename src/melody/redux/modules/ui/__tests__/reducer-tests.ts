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

describe('TOGGLE_COMPONENT_DRAGGING', () => {
    it('should track dragging state of components', () => {
        const action1 = actions.toggleComponentDragging('scrubber', true);
        const action2 = actions.toggleComponentDragging('scrubber', false);
        const newState1 = reducer(initialState.ui, action1);
        const newState2 = reducer(newState1, action2);
        expect(newState1.dragging.scrubber).toBe(true);
        expect(newState2.dragging.scrubber).toBe(false);
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

describe('SET_WRAPPER_ID', () => {
    it('should set the wrapper id', () => {
        const action = actions.setWrapperId('lol123');
        const newState = reducer(initialState.ui, action);
        expect(newState.wrapperId).toBe('lol123');
    });
});
