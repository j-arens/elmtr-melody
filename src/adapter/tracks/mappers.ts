import { Track } from '@redux/type';
import {
    ExternalTrackData,
    InternalTrackData,
} from '../type';
import { getDownloadUrl } from './helpers';

/**
 * Map external tracks into a melody track shape
 */
export function external(track: ExternalTrackData): Track {
    const {
        melody_external_track_url,
        melody_track_artwork,
        melody_track_artist,
        melody_track_album,
        melody_track_title,
    } = track;
    return {
        source_url: melody_external_track_url,
        download_url: getDownloadUrl(track, 'external'),
        artwork: {
            source_url: melody_track_artwork.url,
            sizes: melody_track_artwork.sizes,
        },
        media_details: {
            artist: melody_track_artist,
            album: melody_track_album,
            title: melody_track_title,
        },
        attributes: {
            origin: 'external',
        },
    };
}

/**
 * Map internal tracks into a melody track shape
 */
export function mediaPicker(track: InternalTrackData): Track {
    const {
        melody_internal_track_url,
        melody_track_artwork,
        melody_track_artist,
        melody_track_album,
        melody_track_title,
    } = track;
    return {
        source_url: melody_internal_track_url,
        download_url: getDownloadUrl(track, 'internal'),
        artwork: {
            source_url: melody_track_artwork.url,
            sizes: melody_track_artwork.sizes,
        },
        media_details: {
            artist: melody_track_artist,
            album: melody_track_album,
            title: melody_track_title,
        },
        attributes: {
            origin: 'internal',
        },
    };
}
