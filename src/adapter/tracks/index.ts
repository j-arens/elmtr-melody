import { defaultTrack } from './defaults';
import * as mappers from './mappers';
import {
    mergeIntoDefault,
    getTrackLengths,
    assignDuration,
} from './helpers';

export const prepareTracks = async tracks => {
    if (!Array.isArray(tracks)) {
        tracks = [];
    }
    const durations = await getTrackLengths(tracks);
    return tracks
        .map((t, index) => assignDuration(t, durations[index]))
        .map(normalizeTrack);
}

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
}