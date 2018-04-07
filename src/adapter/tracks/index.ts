import { defaultTrack } from './defaults';
import {
    assignDuration,
    getTrackDurations,
    mergeIntoDefault,
} from './helpers';
import * as mappers from './mappers';

export const prepareTracks = tracks => {
    if (!Array.isArray(tracks)) {
        tracks = [];
    }
    const durations = getTrackDurations(tracks);
    return tracks
        .map((t, index) => assignDuration(t, durations[index]))
        .map(normalizeTrack);
};

const normalizeTrack = track => {
    let normalized = defaultTrack;

    switch (track.melody_audio_source) {

        case 'external-source': {
            normalized = mappers.external({...track});
            break;
        }

        case 'media-library': {
            normalized = mappers.mediaPicker({...track});
            break;
        }

        default: {
            break;
        }
    }

    return mergeIntoDefault(normalized);
};
