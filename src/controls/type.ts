import { Model, View } from 'backbone';

interface ElementorDataModel {
    $el: JQuery;
    elementSettingsModel: Model;
    trigger: (name: string, model: SettingsModel | Model) => Model;
    set: (mutation: Mutation) => Model;
}

export interface SettingsModel extends ElementorDataModel {
    onReady: () => void;
}

export interface Mediaframe extends View<Model> {
    state: () => Model;
    open: () => Mediaframe;
}

export interface TriggerEvent {
    $trigger: JQuery;
    model: SettingsModel;
}

export type TriggerAction =
    | string
    | 'SELECT_TRACK'
    | 'CLEAR_TRACK';

export interface SwapParams {
    $trigger: JQuery;
    action: TriggerAction;
    text: string;
}

export interface Mutation {
    melody_track_title?: string;
    melody_track_album?: string;
    melody_track_artist?: string;
    melody_track_url?: string;
    melody_track_image?: string;
}

export type MutationMap = string[][];

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

export interface SelectionParams {
    model: SettingsModel;
    map: MutationMap;
    frame: Mediaframe;
}
