import { MachineStates } from '@state-machine/type';
import { getReturnOfExpression } from 'typesafe-actions';
import {
    deleteCustomProperty,
    editCustomProperties,
    nextTrack,
    prevTrack,
    toggleDock,
    toggleGliderDragging,
    toggleRepeat,
    toggleShuffle,
    toggleVolDragging,
    triggerTimeSync,
    updateCurrentTime,
    updateVolume,
    changeView,
    speedUp,
    slowDown,
} from './actions';

export type View =
 | 'simple-toolbar'
 | 'slider'
 | 'track-list';

export interface Track {
    source_url: string;
    download_url: string;
    artwork: string;
    media_details: {
        artist: string,
        title: string,
        length: number,
    };
    attributes: {
        origin: 'internal' | 'external';
        attachment: number;
    };
}

export interface CustomProperties {
    [name: string]: string;
}

export interface State {
    readonly currentState: MachineStates;
    readonly lastState: MachineStates;
    readonly tracks: Track[];
    readonly currentTrack: number;
    readonly lastTrack: number;
    readonly shuffle: boolean;
    readonly repeat: boolean;
    readonly volume: number;
    readonly currentTime: number;
    readonly timeSync: number;
    readonly playbackRate: number;
    readonly ui: {
        readonly view: View;
        readonly gliderIsDragging: boolean,
        readonly volIsDragging: boolean,
        readonly customProperties: CustomProperties,
        readonly showDock: boolean,
    };
}

const returnOfActions = [
    updateCurrentTime,
    nextTrack,
    prevTrack,
    toggleShuffle,
    toggleRepeat,
    toggleVolDragging,
    toggleGliderDragging,
    updateVolume,
    triggerTimeSync,
    editCustomProperties,
    deleteCustomProperty,
    toggleDock,
    speedUp,
    slowDown,
    changeView,
].map(getReturnOfExpression);

interface PayloadAction {
    type: string;
    payload?: any;
}

export type Action = typeof returnOfActions[number] & PayloadAction;
