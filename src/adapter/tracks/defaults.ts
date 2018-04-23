import { Track } from '@redux/type';
import { GLOBAL } from '../constants';
const { MELODY_ENV: { pluginsUrl } } = GLOBAL;

/**
 * A default track shape to merge against
 */
export const defaultTrack: Track = {
    source_url: `${pluginsUrl}/elmtr-melody/public/resources/placeholder-track.mp3`,
    download_url: '',
    artwork: '',
    media_details: {
        artist: 'Artist',
        album: 'Album',
        title: 'Title',
    },
    attributes: {
        origin: 'internal',
    },
};
