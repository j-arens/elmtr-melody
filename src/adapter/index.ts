import { makeApp, makeError } from '@melody/index';
import * as actions from '@redux/actions';
import configureStore from '@redux/index';
import intialState from '@redux/initialState';
import throttle from 'lodash.throttle';
import { GLOBAL } from './constants';
import { compose } from './helpers';
import { prepareTracks } from './tracks/';
const throttle = require('lodash.throttle');

const reset = ({ store, config }) => {
    store.dispatch(actions.resetState());
    return { store, config };
};

const view = ({ store, config }) => {
    const style = config.melody_component_style;
    store.dispatch(actions.changeView(style));
    return { store, config };
};

const tracks = ({ store, config }) => {
    const audioTracks = config.melody_audio_tracks;
    const prepared = prepareTracks(audioTracks);
    store.dispatch(actions.setTracks(prepared));
    return { store, config };
};

const initialize = compose(
    reset,
    view,
    tracks,
);

const newInstance = throttle((config, id) => {
    const store = configureStore(intialState);
    initialize({ store, config });

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
