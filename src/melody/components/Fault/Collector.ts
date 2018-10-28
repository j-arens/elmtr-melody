import { State } from '@redux/type';
import { NetworkStates } from '@utils/index';
import { compose } from 'redux';
import { ErrorCodes } from './codes';

interface ErrorCheckerParams {
    state: State;
    audioInterface: HTMLAudioElement;
    errors: Set<ErrorCodes>;
}

/**
 * Checks for no/bad audio sources
 */
export const badSource = (
    params: ErrorCheckerParams,
): ErrorCheckerParams => {
    const { audioInterface, state } = params;
    const { audio: { tracks, currentTrack } } = state;
    if (!tracks.length || !tracks[currentTrack] || !tracks[currentTrack].source_url) {
        params.errors.add(ErrorCodes.MELODY_BAD_SOURCE);
    }
    if (audioInterface) {
        const networkState = audioInterface.networkState;
        if (networkState === NetworkStates.NETWORK_NO_SOURCE) {
            params.errors.add(ErrorCodes.MELODY_BAD_SOURCE);
        }
    }
    return params;
};

/**
 * Checks if there any tracks loaded in state
 */
export const noTracks = (
    params: ErrorCheckerParams,
): ErrorCheckerParams => {
    const { state: { audio } } = params;
    if (!audio.tracks.length) {
        params.errors.add(ErrorCodes.MELODY_NO_TRACKS);
    }
    return params;
};

/**
 * Checks for fault state
 */
export const genericFault = (
    params: ErrorCheckerParams,
): ErrorCheckerParams => {
    const { state, audioInterface } = params;
    if (state.machine.currentState === 'fault') {
        params.errors.add(ErrorCodes.MELODY_GENERIC_FAULT);
    }
    return params;
};

const collect = compose(
    badSource,
    noTracks,
    genericFault,
);

export default (
    state: State,
    audioInterface: HTMLAudioElement,
): Set<ErrorCodes> => {
    const { errors } = collect({ state, audioInterface, errors: new Set() });
    return errors;
};
