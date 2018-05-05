import { Dispatch, View } from '@redux/type';

export type TrackOrigin = 'internal' | 'external';

type TrackSource = 'media-library' | 'external-source';

export interface TrackSize {
    file: string;
    height: number;
    width: number;
    'mime-type': string;
    uri: string;
    size: string;
}

interface TrackArtwork {
    url: string;
    id: string;
    sizes: TrackSize[];
}

interface BaseTrackData {
    melody_audio_source: TrackSource;
    melody_track_album: string;
    melody_track_artist: string;
    melody_track_artwork: TrackArtwork;
    melody_track_download_source: string;
    melody_track_downloadable: string;
    melody_track_id: number;
    melody_track_title: string;
}

export interface InternalTrackData extends BaseTrackData {
    melody_internal_track_duration: string;
    melody_internal_track_url: string;
}

export interface ExternalTrackData extends BaseTrackData {
    melody_external_track_url: string;
}

export type TrackData =
    | InternalTrackData
    | ExternalTrackData;

export interface Config {
    melody_audio_tracks: TrackData[];
    melody_component_style: View;
}

export interface TrackMiddlewareParams {
    dispatch: Dispatch;
    config: Config;
}
