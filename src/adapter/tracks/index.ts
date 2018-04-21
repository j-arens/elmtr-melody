import { Track } from '@redux/type';
import {
    ExternalTrackData,
    InternalTrackData,
    TrackData,
} from '../type';
import { defaultTrack } from './defaults';
import { mergeIntoDefault } from './helpers';
import * as mappers from './mappers';

/**
 * Prepare track data for use with melody
 */
export const prepareTracks = (tracks: TrackData[]): Track[] => {
    if (!Array.isArray(tracks)) {
        tracks = [];
    }
    return tracks.map(normalizeTrack);
};

/**
 * Map track data into the expected shape for melody
 */
const normalizeTrack = (track: TrackData): Track => {
    let normalized = defaultTrack;

    switch (track.melody_audio_source) {

        case 'external-source': {
            normalized = mappers.external({...track} as ExternalTrackData);
            break;
        }

        case 'media-library': {
            normalized = mappers.mediaPicker({...track} as InternalTrackData);
            break;
        }

        default: {
            break;
        }
    }

    return mergeIntoDefault(normalized);
};
