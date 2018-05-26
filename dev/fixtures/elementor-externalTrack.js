const basetrack = require('./elementor-baseTrack');

module.exports = Object.assign({}, basetrack, {
    melody_audio_source: 'external-source',
    melody_external_track_url: 'http://external-track/track.mp3',
});
