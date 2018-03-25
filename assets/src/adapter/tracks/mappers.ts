import { getDownloadUrl } from './helpers';

export function external(track) {
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
            length: duration,
        },
        attributes: {
            origin: 'external',
            attachment: 0,
        },
    };
}

export function mediaPicker(track) {
    const {
        duration,
        melody_wp_media_picker: {
            album,
            artwork,
            artist,
            title,
            url,
            id,
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
            length: duration,
        },
        attributes: {
            origin: 'internal',
            attachment: id,
        },
    };
}