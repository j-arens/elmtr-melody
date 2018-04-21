import { Track } from '@redux/type';
import {
    getDownloadUrl,
    getTrackDuration,
} from './helpers';

/**
 * Map external tracks into a melody track shape
 */
export function external(track): Track {
    const {
        melody_external_track_url,
        melody_track_artwork,
        melody_track_artist,
        melody_track_album,
        melody_track_title,
        duration,
    } = track;
    return {
        source_url: melody_external_track_url,
        download_url: getDownloadUrl(track, 'external'),
        artwork: melody_track_artwork.url,
        media_details: {
            artist: melody_track_artist,
            album: melody_track_album,
            title: melody_track_title,
            length: getTrackDuration(track),
        },
        attributes: {
            origin: 'external',
        },
    };
}

/**
 * Map internal tracks into a melody track shape
 */
export function mediaPicker(track): Track {
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
        artwork: melody_track_artwork.url,
        media_details: {
            artist: melody_track_artist,
            album: melody_track_album,
            title: melody_track_title,
            length: getTrackDuration(track),
        },
        attributes: {
            origin: 'internal',
        },
    };
}
