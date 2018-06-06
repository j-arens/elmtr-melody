import { MachineStates } from '@state-machine/type';
import { View } from './type';

export default {
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
        view: 'slider' as View,
        gliderIsDragging: false,
        volIsDragging: false,
        showDock: false,
    },
};
