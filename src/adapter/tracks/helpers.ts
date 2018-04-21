import { Track } from '@redux/type';
import { GLOBAL } from '../constants';
import {
    ExternalTrackData,
    InternalTrackData,
    TrackData,
    TrackOrigin,
} from '../type';
import { defaultTrack } from './defaults';

const mergewith = require('lodash.mergewith');
const { MELODY_ENV: { pluginsUrl, siteUrl } } = GLOBAL;

/**
 * Get the full download url for a track if it's downloadable
 */
export const getDownloadUrl = (track: TrackData, origin: TrackOrigin): string => {
    if (origin === 'external') {
        if (track.melody_track_downloadable === 'yes') {
            return track.melody_track_download_source;
        }

        return '';
    }

    if (track.melody_track_downloadable === 'yes') {
        const { melody_track_id: id } = track;
        const clientId = Math.round(Math.random() * 99999);
        return `${siteUrl}?melody=/download&clientId=${clientId}&attachment=${id}`;
    }

    return '';
};

/**
 * Merge a track with the default
 */
export const mergeIntoDefault = (track: Track): Track =>
    mergewith({}, defaultTrack, track, (oV, srcV) =>
        srcV === '' ? oV : undefined,
    );

/**
 * Convert string track length to interger seconds
 */
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

/**
 * Get the duration of an internal track in seconds
 */
export const getInternalTrackDuration = (
    track: InternalTrackData,
): number => trackLengthToSeconds(track.melody_internal_track_duration);

/**
 * Get the duration of an external track in seconds
 */
export const getExternalTrackDuration = (track: ExternalTrackData): number => {
    if (!track.melody_external_track_url) {
        track.melody_external_track_url = `${pluginsUrl}/elmtr-melody/assets/audio/placeholder-track.mp3`;
    }

    const audio = new Audio();
    audio.addEventListener('loadedmetadata', () => {
        const { duration } = audio;
        if (isNaN(duration)) {
            return 0;
        }
        return Math.round(duration);
    });
    audio.src = track.melody_external_track_url;
};
