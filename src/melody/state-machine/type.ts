export type MachineStates =
    | 'fetching'
    | 'fault'
    | 'stopped'
    | 'playing'
    | 'buffering';

export type MachineAction =
    | 'FETCH_SOURCE'
    | 'FAILED'
    | 'SUCCESS'
    | 'READY'
    | 'PROCEED'
    | 'STOP'
    | 'PLAY'
    | 'LOADING'
    | 'RELOAD'
    | 'REJECTED'
    | 'NOOP';
