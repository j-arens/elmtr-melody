import { prepareTracks } from './tracks/';
import { prepareRules } from './css/';
const throttle = require('lodash.throttle');

const { MELODY, jQuery: $ } = (window as any);

if (MELODY === undefined) {
    console.error('lol adapter cant work error'); // @TODO: make gud error msg
}

$(window).on('melody/init_app', throttle(init, 500));

async function init ({ config, id }) {
    const { app } = MELODY;
    const store = app.createStore();
    resetApp(store);
    setView(store, config.melody_component_style);
    await injectTracks(store, config.melody_audio_tracks);
    await injectCss(store, config);
    app.mount(id, store);
}

const resetApp = ({ dispatch }) => dispatch({
    type: 'melody/RESET_STATE',
});

const setView = ({ dispatch }, view) => dispatch({
    type: 'melody/CHANGE_VIEW',
    payload: view,
});

const injectTracks = async ({ dispatch }, tracks) => dispatch({
    type: 'melody/SET_TRACKS',
    payload: await prepareTracks(tracks),
});

const injectCss = ({ dispatch }, config) => dispatch({
    type: 'melody/EDIT_CUSTOM_PROPS',
    payload: prepareRules({...config}),
});

MELODY.adapter = {
    init,
};