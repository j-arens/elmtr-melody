import reducer from '../index';
import * as actions from '../actions';
import initialState from '@redux/initialState';
const tracks = require('@tracks');

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

describe('TRIGGER_TIME_SYNC', () => {
    it('should increment timeSync', () => {
        const action = actions.triggerTimeSync();
        const newState = reducer(initialState, action);
        expect(newState.timeSync).toBe(1);
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

describe('SET_FILE_LENGTH', () => {
    it('sets the filelength', () => {
        const action = actions.setFilelength(245);
        const newState = reducer(initialState, action);
        expect(newState.filelength).toBe(245);
    });

    it('rounds input to nearest whole number', () => {
        const action = actions.setFilelength(356.235);
        const newState = reducer(initialState, action);
        expect(newState.filelength).toBe(356);
    });

    it('bails if input is NaN', () => {
        const action = actions.setFilelength(NaN);
        const newState = reducer(initialState, action);
        expect(newState.filelength).toBe(0);
    });
});
