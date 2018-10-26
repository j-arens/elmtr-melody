import initialState from '@redux/initialState';
import * as actions from '../actions';
import reducer from '../index';

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
    const target = document.createElement('div');

    beforeAll(() => {
        global.jQuery = () => ({
            closest: () => global.jQuery(),
            get: () => global.jQuery(),
            getBoundingClientRect: jest.fn(() => ({
                left: 100,
                top: 100,
            })),
        });
    });

    afterAll(() => {
        global.jQuery = jest.fn();
    });

    it('should toggle showing the dock', () => {
        const action = actions.toggleDock(target);
        const newState = reducer(initialState.ui, action);
        expect(newState.showDock).toBe(true);
    });

    it('should calculate the dock coordinates', () => {
        target.getBoundingClientRect = jest.fn(() => ({
            width: 100,
            left: 100,
            bottom: 100,
        }));
        const action = actions.toggleDock(target);
        const newState = reducer(initialState.ui, action);
        expect(newState.dockCoordinates).toMatchObject({
            width: 100,
            x: 0,
            y: 0,
        });
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
