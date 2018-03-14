import { prepareTracks } from './tracks/';
import { prepareRules } from './css/';
const throttle = require('lodash.throttle');

const { MELODY, jQuery: $ } = (window as any);

if (MELODY === undefined) {
    console.error('lol adapter cant work error'); // @TODO: make gud error msg
}

$(window).on('melody/init_app', throttle(init, 500));

async function init ({ config, selector }) {
    const { app } = MELODY;
    const store = app.getStore();
    resetApp(store);
    await injectTracks(store, config.melody_audio_tracks);
    await injectCss(store, config);
    app.mount(selector);
}

const resetApp = ({ dispatch }) => dispatch({
    type: 'melody/RESET_STATE',
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