import { makeApp, makeError } from '@melody/index';
import * as actions from '@redux/actions';
import configureStore from '@redux/index';
import initialState from '@redux/initialState';
import { GLOBAL } from './constants';
import { compose } from './helpers';
import { prepareTracks } from './tracks/';
import {
    Config,
    TrackMiddlewareParams,
} from './type';
const throttle = require('lodash.throttle');

/**
 * Dispatch action to reset the app state
 */
export const reset = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    dispatch(actions.resetState());
    return { dispatch, config };
};

/**
 * Dispatch action to load component style view
 */
export const view = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    const style = config.melody_component_style;
    dispatch(actions.changeView(style));
    return { dispatch, config };
};

/**
 * Dispatch action to load the audio tracks
 */
export const tracks = (
    { dispatch, config }: TrackMiddlewareParams,
): TrackMiddlewareParams => {
    const audioTracks = config.melody_audio_tracks;
    const prepared = prepareTracks(audioTracks);
    dispatch(actions.setTracks(prepared));
    return { dispatch, config };
};

/**
 * Intialization composition
 */
const initialize = compose(
    reset,
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
