const tracks = require('@tracks');
const customProps = require('@customProps');
import { MachineStates } from '../../state-machine/type';
import * as actions from '../actions';
import { CYCLE_STATE } from '../constants';
import initialState from '../initialState';
import reducer from '../rootReducer';

describe('CYCLE_STATE', () => {
    it('cycles the state machine', () => {
        const action = {
            type: CYCLE_STATE,
            payload: 'SUCCESS',
        };

        const state = {
            ...initialState,
            currentState: 'fetching' as MachineStates,
            lastState: 'stopped' as MachineStates,
        };

        const newState = reducer(state, action);
        expect(newState.currentState).toBe('stopped');
        expect(newState.lastState).toBe('fetching');
    });

    it('cycles to fault if invalid transition', () => {
        const action = {
            type: CYCLE_STATE,
            payload: 'PLAY',
        };

        const state = {
            ...initialState,
            currentState: 'fetching' as MachineStates,
            lastState: 'stopped' as MachineStates,
        };

        const newState = reducer(state, action);
        expect(newState.currentState).toBe('fault');
        expect(newState.lastState).toBe('fetching');
    });
});

describe('SET_CURRENT_TRACK', () => {
    let state;

    beforeEach(() => {
        state = {
            ...initialState,
            tracks: [{}, {}],
        };
    });

    it('should update the currentTrack', () => {
        const action = actions.setCurrentTrack(1);
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(1);
    });

    it('should return if newIndex is less than 0', () => {
        const action = actions.setCurrentTrack(-1);
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(0);
    });

    it('should return if the newIndex is greater than tracks.length', () => {
        const action = actions.setCurrentTrack(-1);
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(0);
    });

    it('should return if the newIndex is equal to the currentTrack', () => {
        const action = actions.setCurrentTrack(0);
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(0);
    });
});

describe('SET_TRACKS', () => {
    it('should set tracks on state', () => {
        const action = actions.setTracks(tracks);
        const newState = reducer(initialState, action);
        expect(newState.tracks).toEqual(tracks);
    });
});

describe('UPDATE_CURRENT_TIME', () => {
    it('should update the current time', () => {
        const action = actions.updateCurrentTime(808);
        const newState = reducer(initialState, action);
        expect(newState.currentTime).toBe(808);
    });
});

describe('NEXT_TRACK', () => {
    it('if there is more than one track it should increment the currentTrack', () => {
        const action = actions.nextTrack();
        const state = {
            ...initialState,
            tracks,
        };
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(1);
        expect(newState.lastTrack).toBe(0);
    });

    it('should pick a random track if shuffle is true', () => {
        const action = actions.nextTrack();
        const state = {
            ...initialState,
            shuffle: true,
            tracks,
        };
        const newState = reducer(state, action);
        expect(newState.currentTrack).not.toBe(0);
        expect(newState.lastTrack).toBe(0);
    });
});

describe('PREV_TRACK', () => {
    it('if there is more than one track and shuffle is false it should decrement the currentTrack', () => {
        const action = actions.prevTrack();
        const state = {
            ...initialState,
            currentTrack: 2,
            lastTrack: 1,
            tracks,
        };
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(1);
        expect(newState.lastTrack).toBe(2);
    });

    it('should set the currentTrack as the lastTrack if shuffle is true', () => {
        const action = actions.prevTrack();
        const state = {
            ...initialState,
            shuffle: true,
            currentTrack: 4,
            lastTrack: 1,
            tracks,
        };
        const newState = reducer(state, action);
        expect(newState.currentTrack).toBe(1);
        expect(newState.lastTrack).toBe(4);
    });
});

describe('TOGGLE_SHUFFLE', () => {
    it('should toggle shuffle', () => {
        const action = actions.toggleShuffle();
        const newState = reducer(initialState, action);
        expect(newState.shuffle).toBe(true);
    });
});

describe('TOGGLE_REPEAT', () => {
    it('should toggle repeat', () => {
        const action = actions.toggleRepeat();
        const newState = reducer(initialState, action);
        expect(newState.repeat).toBe(true);
    });
});

describe('TOGGLE_VOL_DRAGGING', () => {
    it('should toggle volIsDragging flag', () => {
        const action = actions.toggleVolDragging();
        const newState = reducer(initialState, action);
        expect(newState.ui.volIsDragging).toBe(true);
    });
});

describe('UPDATE_VOLUME', () => {
    it('should update the volume', () => {
        const action = actions.updateVolume(0.5);
        const newState = reducer(initialState, action);
        expect(newState.volume).toBe(0.5);
    });

    it('should return original state if newLevel is the same as the current level', () => {
        const action = actions.updateVolume(1);
        const newState = reducer(initialState, action);
        expect(newState).toEqual(initialState);
    });
});

describe('TOGGLE_GLIDER_DRAGGING', () => {
    it('should toggle gliderIsDragging flag', () => {
        const action = actions.toggleGliderDragging();
        const newState = reducer(initialState, action);
        expect(newState.ui.gliderIsDragging).toBe(true);
    });
});

describe('TRIGGER_TIME_SYNC', () => {
    it('should increment timeSync', () => {
        const action = actions.triggerTimeSync();
        const newState = reducer(initialState, action);
        expect(newState.timeSync).toBe(1);
    });
});

describe('EDIT_CUSTOM_PROPS', () => {
    it('should add new custom properties', () => {
        const action = actions.editCustomProperties(customProps);
        const newState = reducer(initialState, action);
        expect(newState.ui.customProperties.background_color).toBe('rgba(0, 0, 0, 1)');
    });

    it('should edit existing custom properties', () => {
        const action = actions.editCustomProperties({ background_color: 'legitLavender' });
        const state = {
            ...initialState,
            ui: {
                ...initialState.ui,
                customProperties: {
                    ...customProps,
                },
            },
        };
        const newState = reducer(state, action);
        expect(newState.ui.customProperties.background_color).toBe('legitLavender');
    });
});

describe('DELETE_CUSTOM_PROP', () => {
    it('should remove custom properties', () => {
        const action = actions.deleteCustomProperty('background_color');
        const state = {
            ...initialState,
            ui: {
                ...initialState.ui,
                customProperties: {
                    ...customProps,
                },
            },
        };
        const newState = reducer(state, action);
        expect(newState.ui.customProperties.background_color).toBeUndefined();
    });
});

describe('RESET_STATE', () => {
    it('should reset state to initialState', () => {
        const action = actions.resetState();
        const state = {
            ...initialState,
            shuffle: true,
            currentTrack: 4,
            lastTrack: 1,
            tracks,
        };
        const newState = reducer(state, action);
        expect(newState).toEqual(initialState);
    });
});

describe('TOGGLE_DOCK', () => {
    it('should toggle showing the dock', () => {
        const action = actions.toggleDock();
        const newState = reducer(initialState, action);
        expect(newState.ui.showDock).toBe(true);
    });
});

describe('SPEED_UP', () => {
    it('should increase playback rate in quarter intervals', () => {
        const action = actions.speedUp();
        const newState = reducer(initialState, action);
        expect(newState.playbackRate).toBe(1.25);
    });

    it('should not increase past 2', () => {
        const action = actions.speedUp();
        const state = {
            ...initialState,
            playbackRate: 2,
        };
        const newState = reducer(state, action);
        expect(newState.playbackRate).toBe(2);
    });
});

describe('SLOW_DOWN', () => {
    it('should decrease playback rate in quarter intervals', () => {
        const action = actions.slowDown();
        const newState = reducer(initialState, action);
        expect(newState.playbackRate).toBe(0.75);
    });

    it('should not decrease past 0.5', () => {
        const action = actions.slowDown();
        const state = {
            ...initialState,
            playbackRate: 0.5,
        };
        const newState = reducer(state, action);
        expect(newState.playbackRate).toBe(0.5);
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
