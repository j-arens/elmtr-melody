import { TrackSize } from '@adapter/type';
import { MachineStates } from '@state-machine/type';
import { getReturnOfExpression } from 'typesafe-actions';
import * as actions from './actions';

export type View =
 | 'simple-toolbar'
 | 'slider';

export interface TrackArtwork {
    source_url: string;
    sizes: TrackSize[];
}

export interface Track {
    source_url: string;
    download_url: string;
    artwork: TrackArtwork;
    media_details: {
        album: string,
        artist: string,
        title: string,
        length?: number,
    };
    attributes: {
        origin: 'internal' | 'external';
        attachment?: number;
    };
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
    readonly filelength: number;
    readonly ui: {
        readonly view: View;
        readonly gliderIsDragging: boolean,
        readonly volIsDragging: boolean,
        readonly showDock: boolean,
    };
}

export type Dispatch = (params: any) => Action;

const returnOfActions = [
    actions.updateCurrentTime,
    actions.nextTrack,
    actions.prevTrack,
    actions.toggleShuffle,
    actions.toggleRepeat,
    actions.toggleVolDragging,
    actions.toggleGliderDragging,
    actions.updateVolume,
    actions.triggerTimeSync,
    actions.toggleDock,
    actions.speedUp,
    actions.slowDown,
    actions.changeView,
].map(getReturnOfExpression);

interface PayloadAction {
    type: string;
    payload?: any;
}

export type Action = typeof returnOfActions[number] & PayloadAction;
