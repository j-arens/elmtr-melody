import { Track } from '@redux/type';
import { GLOBAL } from '../constants';
import {
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
        return `${siteUrl}?melody=/download&attachment=${id}`;
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
