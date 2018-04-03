export default {
    fetching: {
        FAILED: 'fault',
        REJECTED: 'fault',
        SUCCESS: 'stopped',
        NOOP: 'fetching',
    },
    buffering: {
        READY: 'stopped',
        PROCEED: 'playing',
        FAILED: 'fault',
        NOOP: 'buffering',
    },
    playing: {
        STOP: 'stopped',
        LOADING: 'buffering',
        FAILED: 'fault',
        NOOP: 'playing',
    },
    stopped: {
        PLAY: 'playing',
        LOADING: 'buffering',
        FAILED: 'fault',
        FETCH_SOURCE: 'fetching',
        NOOP: 'stopped',
    },
    fault: {
        RELOAD: 'fetching',
        NOOP: 'fault',
    },
};
