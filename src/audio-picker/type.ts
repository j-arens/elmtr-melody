import { Model, View } from 'backbone';

export interface SettingsModel {
    model: Model;
    retrieve: () => Model;
}

export type FrameType = 'image' | 'audio';

export interface Panel extends View<Model> {
    currentPageView: {
        $el: JQuery,
    };
}

export interface MelodyResources {
    $container: JQuery;
    index: number;
    model: Model;
    state: TrackState;
}

export interface MediaFrame extends View<Model> {
    _melodyResources: MelodyResources;
    state: () => Model;
}

export type TriggerAction =
    | 'SELECT_TRACK'
    | 'CLEAR_TRACK'
    | 'ADD_IMAGE'
    | 'CLEAR_IMAGE';

export interface TrackResources {
    $container: JQuery;
    index: number;
    model: Model;
    state: TrackState;
}

export interface TrackState {
    album: string;
    artist: string;
    artwork: string;
    id: string;
    title: string;
    url: string;
    duration: string;
}

export interface TrackMutation {
    album?: string;
    artist?: string;
    artwork?: string;
    id?: string;
    title?: string;
    url?: string;
    duration?: string;
}

export type AudioPickerField =
    | 'artist'
    | 'album'
    | 'artist'
    | 'title';
