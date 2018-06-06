import { makeApp, makeError } from '@melody/index';
import configureStore from '@redux/index';
import initialState from '@redux/initialState';
import * as audioActions from '@redux/modules/audio/actions';
import * as stateActions from '@redux/modules/machine/actions';
import * as uiActions from '@redux/modules/ui/actions';
import { GLOBAL } from './constants';
import { compose } from './helpers';
import { prepareTracks } from './tracks/';
import {
    Config,
    TrackMiddlewareParams,
} from './type';
const throttle = require('lodash.throttle');

/**
 * Dispatch action to load component style view
 */
export const view = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    const { melody_component_style } = config;
    dispatch(uiActions.changeView(melody_component_style));
    return { dispatch, config };
};

/**
 * Dispatch action to load the audio tracks
 */
export const tracks = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    const { melody_audio_tracks } = config;
    const prepared = prepareTracks(melody_audio_tracks);
    dispatch(audioActions.setTracks(prepared));
    return { dispatch, config };
};

/**
 * Intialization composition
 */
const initialize = compose(
    view,
    tracks,
);

/**
 * Creates a new Melody App instance and configures it
 */
const newInstance = throttle((config: Config, id: string): void => {
    const store = configureStore(initialState);
    initialize({ dispatch: store.dispatch, config });

    if (process.env.NODE_ENV === 'development') {
        makeApp(id, store);
    } else {
        try {
            makeApp(id, store);
        } catch (e) {
            makeError(e);
            console.error(Error(e));
        }
    }
}, 500);

GLOBAL.MELODY = {
    newInstance,
};
