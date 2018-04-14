import { defaultTrack } from './defaults';
import { mergeIntoDefault } from './helpers';
import * as mappers from './mappers';

export const prepareTracks = tracks => {
    if (!Array.isArray(tracks)) {
        tracks = [];
    }
    return tracks.map(normalizeTrack);
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
