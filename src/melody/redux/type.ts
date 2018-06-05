import { TrackSize } from '@adapter/type';
import * as audioActions from '@redux/modules/audio/actions';
import * as uiActions from '@redux/modules/ui/actions';
import { MachineStates } from '@state-machine/type';
import { getReturnOfExpression } from 'typesafe-actions';

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
    readonly state: {
        readonly currentState: MachineStates;
        readonly lastState: MachineStates;
    };
    readonly audio: {
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
    };
    readonly ui: {
        readonly view: View;
        readonly gliderIsDragging: boolean,
        readonly volIsDragging: boolean,
        readonly showDock: boolean,
    };
}

export type Dispatch = (params: any) => Action;

const returnOfActions = [
    ...Object.values(audioActions),
    ...Object.values(uiActions),
].map(getReturnOfExpression);

interface PayloadAction {
    type: string;
    payload?: any;
}

export type Action = typeof returnOfActions[number] & PayloadAction;
