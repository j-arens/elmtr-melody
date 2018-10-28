import initialState from '@redux/initialState';
import { NetworkStates } from '@utils/index';
import { ErrorCodes } from '../codes';
import * as collectors from '../Collector';
const clonedeep = require('lodash.clonedeep');

describe('error collectors', () => {
    let params;

    beforeEach(() => {
        params = {
            state: clonedeep(initialState),
            audioInterface: { networkState: 0 },
            errors: new Set(),
        };
    });

    describe('badSource()', () => {
        it('adds a bad source error if there are no tracks', () => {
            collectors.badSource(params);
            expect(params.errors.has(ErrorCodes.MELODY_BAD_SOURCE)).toBe(true);
        });

        it('adds a bad source error if there is no track at the current index', () => {
            params.state.audio.tracks.push({ source_url: 'lol' });
            params.state.audio.currentTrack = 1;
            collectors.badSource(params);
            expect(params.errors.has(ErrorCodes.MELODY_BAD_SOURCE)).toBe(true);
        });

        it('adds a bad source error if the current track doesnt have a source url', () => {
            params.state.audio.tracks.push({ source_url: '' });
            collectors.badSource(params);
            expect(params.errors.has(ErrorCodes.MELODY_BAD_SOURCE)).toBe(true);
        });

        it('adds a bad source error if the audioInterface network state equals no source', () => {
            params.audioInterface.networkState = NetworkStates.NETWORK_NO_SOURCE;
            collectors.badSource(params);
            expect(params.errors.has(ErrorCodes.MELODY_BAD_SOURCE)).toBe(true);
        });
    });

    describe('noTracks()', () => {
        it('adds a no tracks errors if there are no tracks in state', () => {
            collectors.noTracks(params);
            expect(params.errors.has(ErrorCodes.MELODY_NO_TRACKS)).toBe(true);
        });
    });

    describe('genericFault()', () => {
        it('adds a generic error if the currentState equals fault', () => {
            params.state.machine.currentState = 'fault';
            collectors.genericFault(params);
            expect(params.errors.has(ErrorCodes.MELODY_GENERIC_FAULT)).toBe(true);
        });
    });
});
