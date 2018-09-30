import { DockToggleDims } from '@melody/redux/modules/ui/type';
import { MachineStates } from '@state-machine/type';
import { State, View } from './type';

const initial: State = {
    machine: {
        currentState: 'stopped' as MachineStates,
        lastState: 'stopped' as MachineStates,
    },
    audio: {
        tracks: [],
        currentTrack: 0,
        lastTrack: 0,
        shuffle: false,
        repeat: false,
        volume: 1,
        currentTime: 0,
        timeSync: 0,
        playbackRate: 1,
        filelength: 0,
    },
    ui: {
        wrapperId: '',
        view: 'slider' as View,
        dragging: {},
        showDock: false,
        dockCoordinates: {
            width: 0,
            x: 0,
            y: 0,
        } as DockToggleDims,
    },
};

export default initial;
