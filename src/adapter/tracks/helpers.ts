import { Track } from '@redux/type';
import * as mergewith from 'lodash.mergewith';
import { GLOBAL } from '../constants';
import {
    TrackData,
    TrackOrigin,
} from '../type';
import { defaultTrack } from './defaults';

const { MELODY_ENV: { siteUrl } } = GLOBAL;

/**
 * Get the full download url for a track if it's downloadable
 */
export const getDownloadUrl = (track: TrackData, origin: TrackOrigin): string => {
    const { melody_track_downloadable } = track;
    if (!melody_track_downloadable) {
        return '';
    }
    if (origin === 'external') {
        return track.melody_track_download_source || '';
    }
    const { melody_track_id: id } = track;
    return `${siteUrl}?melody=/download&attachment=${id}`;
};

/**
 * Merge a track with the default
 */
export const mergeIntoDefault = (track: Track): Track =>
    mergewith({}, defaultTrack, track, (oV, srcV) =>
        srcV === '' ? oV : undefined,
    );
