import { defaultTrack } from './defaults';
const mergewith = require('lodash.mergewith');

const { MELODY_ENV: { pluginsUrl, siteUrl } } = (window as any);

export const getDownloadUrl = (track, origin) => {
    if (origin === 'external') {
        if (track.melody_track_downloadable === 'yes') {
            return track.melody_track_download_source;
        }

        return '';
    }

    if (track.melody_track_downloadable === 'yes') {
        const { melody_wp_media_picker: { id } } = track;
        const clientId = Math.round(Math.random() * 99999);
        return `${siteUrl}?melody=/download&clientId=${clientId}&attachment=${id}`;
    }

    return '';
};

export const assignDuration = (track, duration) =>
    Object.assign(track, { duration });

export const mergeIntoDefault = track =>
    mergewith({}, defaultTrack, track, (oV, srcV) =>
        srcV === '' ? oV : undefined,
    );

export const trackLengthToSeconds = (str: string): number => {
    if (!str.includes(':')) {
        return 0;
    }

    const split = str.split(':');
    let s = 0;
    let m = 1;

    while (split.length > 0) {
        s += m * parseInt(split.pop(), 10);
        m *= 60;
    }

    return s;
};

export const getTrackDurations = tracks => Promise.all(tracks.map(t => {
    if (t.melody_audio_source === 'media-library') {
        const duration = t.melody_wp_media_picker.duration;
        return trackLengthToSeconds(duration);
    }

    if (!t.melody_track_url) {
        t.melody_track_url = `${pluginsUrl}/elmtr-melody/assets/audio/placeholder-track.mp3`;
    }

    return new Promise((res, rej) => {
        const audio = new Audio();
        audio.addEventListener('loadedmetadata', () => {
            const { duration } = audio;
            if (isNaN(duration)) {
                return rej(0);
            }
            return res(Math.round(duration));
        });
        audio.src = t.melody_track_url;
    });
}));
