import { Track } from '@redux/type';

/**
 * A default track shape to merge against
 */
export const defaultTrack: Track = {
    source_url: '',
    download_url: '',
    artwork: {
        source_url: '',
        sizes: [],
    },
    media_details: {
        artist: 'Artist',
        album: 'Album',
        title: 'Title',
    },
    attributes: {
        origin: 'internal',
    },
};
