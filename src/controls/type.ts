import { Model, View } from 'backbone';

export interface ElementorDataModel {
    $el: JQuery;
    elementSettingsModel: SettingsModel;
    trigger: (name: string, model: SettingsModel | Model) => Model;
    set: (mutation: Mutation) => Model;
}

export interface SettingsModel extends ElementorDataModel {
    onReady: () => void;
}

export interface Mediaframe extends View<Model> {
    state: () => Model;
    open: () => Mediaframe;
    _melody_$trigger: JQuery;
}

export interface TriggerEvent {
    $trigger: JQuery;
    model: SettingsModel;
    frame: Mediaframe;
}

export type TPTriggerAction =
    | string
    | 'SELECT_TRACK'
    | 'CLEAR_TRACK';

export interface SwapParams {
    $trigger: JQuery;
    action: TPTriggerAction;
    text: string;
}

export interface Mutation {
    melody_track_title?: string;
    melody_track_album?: string;
    melody_track_artist?: string;
    melody_internal_track_url?: string;
    melody_track_id?: number;
    melody_track_artwork?: {
        url?: string;
        id?: string;
    };
    melody_track_picker_control?: number;
}

export interface MutationMap {
    key: string;
    path: string;
    validate?: (value: any) => boolean;
    fallback?: any;
}

export interface AudioAttachment {
    id?: number;
    title?: string;
    meta?: {
        album?: string;
        artist?: string;
    };
    image?: {
        src?: string;
    };
    url?: string;
}

export type Attachment =
    | AudioAttachment;

export interface SelectionParams {
    model: SettingsModel;
    map: MutationMap[];
    frame: Mediaframe;
}
