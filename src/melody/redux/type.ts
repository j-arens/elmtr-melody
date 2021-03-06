import { TrackSize } from '@adapter/type';
import { DockToggleDims, Dragging } from '@melody/redux/modules/ui/type';
import * as audioActions from '@redux/modules/audio/actions';
import * as machineActions from '@redux/modules/machine/actions';
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

export interface MachineState {
    readonly currentState: MachineStates;
    readonly lastState: MachineStates;
}

export interface AudioState {
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
}

export interface UiState {
    readonly wrapperId: string;
    readonly view: View;
    readonly dragging: Dragging;
    readonly showDock: boolean;
    readonly dockCoordinates: DockToggleDims;
}

export interface State {
    readonly machine: MachineState;
    readonly audio: AudioState;
    readonly ui: UiState;
}

export type Dispatch = (params: any) => Action;

const returnOfActions = [
    ...Object.values(audioActions),
    ...Object.values(uiActions),
    ...Object.values(machineActions),
].map(getReturnOfExpression);

interface PayloadAction {
    type: string;
    payload?: any;
}

export type Action = typeof returnOfActions[number] & PayloadAction;
