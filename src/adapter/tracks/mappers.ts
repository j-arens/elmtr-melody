import { Track } from '@redux/type';
import {
    getDownloadUrl,
    getTrackDuration,
} from './helpers';

export function external(track): Track {
    const {
        melody_track_url,
        melody_track_artwork,
        melody_track_artist,
        melody_track_album,
        melody_track_title,
        duration,
    } = track;
    return {
        source_url: melody_track_url,
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

export function mediaPicker(track): Track {
    const {
        duration,
        melody_wp_media_picker: {
            album,
            artwork,
            artist,
            title,
            url,
        },
    } = track;
    return {
        source_url: url,
        download_url: getDownloadUrl(track, 'internal'),
        artwork,
        media_details: {
            artist,
            title,
            album,
            length: getTrackDuration(track),
        },
        attributes: {
            origin: 'internal',
        },
    };
}
