import { ErrorCodes } from '@components/Fault/codes';
import ErrorHandler from '@components/Fault/ErrorHandler';
import ShapeShifter from '@components/ShapeShifter/';
import { GLOBAL } from '@melody/constants';
import { Dragging } from '@redux/modules/ui/type';
import { Track } from '@redux/type';
import { Action } from '@redux/type';
import { MachineAction, MachineStates } from '@state-machine/type';
import {
    getRandomNumInRange,
    NetworkStates,
    timeout,
} from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
const s = require('./style.scss');

export interface StateProps {
    currentState: MachineStates;
    lastState: MachineStates;
    tracks: Track[];
    currentTrack: number;
    currentTime: number;
    dragging: Dragging;
    volIsDragging: boolean;
    volume: number;
    timeSync: number;
    repeat: boolean;
    playbackRate: number;
}

export interface DispatchProps {
    cycleState: (action: MachineAction) => Action;
    updateCurrentTime: (nextTime: number) => Action;
    nextTrack: () => Action;
    setFilelength: (length: number) => Action;
}

type Props = StateProps & DispatchProps;

export default class extends Component<Props, {}> {
    AudioInterface: HTMLAudioElement = new Audio();

    componentDidMount() {
        this.bindAudioInterfaceEvents();
        this.setInterfaceSource(this.props);
        if (process.env.NODE_ENV !== 'production') {
            GLOBAL.MELODY.audioInterface = this.AudioInterface;
        }
    }

    componentWillUnmount() {
        this.AudioInterface.pause();
        this.removeAudioInterfaceEvents();
        delete this.AudioInterface;
    }

    componentDidUpdate(prevProps: Props) {
        const {
            currentState,
            volume,
            tracks,
            currentTrack,
            timeSync,
            repeat,
            playbackRate,
            currentTime,
        } = this.props;

        const stateChanged = prevProps.currentState !== currentState;
        const volumeChanged = prevProps.volume !== volume;
        const tracksChanged = prevProps.tracks !== tracks;
        const currentTrackChanged = prevProps.currentTrack !== currentTrack;
        const timeSyncChanged = prevProps.timeSync !== timeSync;
        const repeatChanged = prevProps.repeat !== repeat;
        const playbackRateChanged = prevProps.playbackRate !== playbackRate;

        if (stateChanged) {
            this.updateInterfaceState(currentState);
        }

        if (tracksChanged || currentTrackChanged) {
            this.setInterfaceSource(this.props);
        }

        if (volumeChanged) {
            this.setInterfaceVolume(volume);
        }

        if (timeSyncChanged) {
            this.setInterfaceTime(currentTime);
        }

        if (repeatChanged) {
            this.setInterfaceRepeat(repeat);
        }

        if (playbackRateChanged) {
            this.setInterfacePlaybackRate(playbackRate);
        }
    }

    bindAudioInterfaceEvents() {
        this.AudioInterface.addEventListener('waiting', this.onInterfaceBuffering);
        this.AudioInterface.addEventListener('canplay', this.onCanPlay);
        this.AudioInterface.addEventListener('timeupdate', this.onTimeUpdate);
        this.AudioInterface.addEventListener('ended', this.onEnded);
        this.AudioInterface.addEventListener('loadedmetadata', this.onLoadedMeta);
    }

    removeAudioInterfaceEvents() {
        this.AudioInterface.removeEventListener('waiting', this.onInterfaceBuffering);
        this.AudioInterface.removeEventListener('canplay', this.onCanPlay);
        this.AudioInterface.removeEventListener('timeupdate', this.onTimeUpdate);
        this.AudioInterface.removeEventListener('ended', this.onEnded);
        this.AudioInterface.removeEventListener('loadedmetadata', this.onLoadedMeta);
    }

    updateInterfaceState(nextState: MachineStates) {
        switch (nextState) {
            case 'fetching':
            case 'stopped':
            case 'fault': {
                this.AudioInterface.pause();
                break;
            }
            case 'playing': {
                this.AudioInterface.play().catch(this.onPlayError);
                break;
            }
            case 'buffering': {
                break;
            }
            default: {
                this.AudioInterface.pause();
                break;
            }
        }
    }

    async setInterfaceSource({ currentState, currentTrack, tracks } = this.props) {
        if (!tracks.length) {
            this.AudioInterface.src = '';
            return;
        }

        const { cycleState } = this.props;
        const nextSource = tracks[currentTrack].source_url;

        if (this.AudioInterface.src === nextSource) {
            return;
        }

        const load = (source) => {
            this.AudioInterface.src = source;
            this.AudioInterface.load();
        };

        if (currentState === 'playing') {
            await cycleState('STOP');
            load(nextSource);
            cycleState('PLAY');
            return;
        }

        load(nextSource);
    }

    setInterfaceTime(nextTime: number) {
        const { dragging } = this.props;
        this.AudioInterface.currentTime = nextTime;
    }

    setInterfaceVolume(newVolume: number) {
        this.AudioInterface.volume = newVolume;
    }

    setInterfaceRepeat(repeat: boolean) {
        this.AudioInterface.loop = repeat;
    }

    setInterfacePlaybackRate(rate: number) {
        this.AudioInterface.playbackRate = rate;
    }

    onInterfaceBuffering = () => {
        const { cycleState, currentState } = this.props;

        if (currentState === 'buffering') {
            return;
        }

        const clear = timeout(10000, () => {
            if (this.props.currentState === 'buffering') {
                cycleState('FAILED');
            } else {
                clear();
            }
        });

        cycleState('LOADING');
    }

    onCanPlay = () => {
        const { currentState, lastState, cycleState } = this.props;

        if (currentState !== 'buffering') {
            return;
        }

        if (lastState === 'playing') {
            cycleState('PROCEED');
            return;
        }

        cycleState('READY');
    }

    onPlayError = (e) => {
        const { cycleState } = this.props;
        if (e.name && e.name !== 'AbortError') {
            console.error('Melody', Error(e));
            cycleState('FAILED');
        }
    }

    onTimeUpdate = () => {
        const nextTime = this.AudioInterface.currentTime;
        const { currentTime, updateCurrentTime, dragging } = this.props;
        if (nextTime === currentTime || dragging.scrubber) {
            return;
        }
        updateCurrentTime(nextTime);
    }

    onEnded = () => {
        const {
            nextTrack,
            repeat,
            tracks,
            cycleState,
            updateCurrentTime,
        } = this.props;

        if (repeat) {
            return;
        }

        if (tracks.length < 2) {
            cycleState('STOP');
            updateCurrentTime(0);
            return;
        }

        nextTrack();
    }

    onLoadedMeta = () => {
        const { setFilelength } = this.props;
        const { duration } = this.AudioInterface;
        setFilelength(duration);
    }

    getErrors(): Set<ErrorCodes> {
        const { currentState, tracks } = this.props;
        const errors = new Set();

        if (currentState === 'fault') {
            errors.add(ErrorCodes.MELODY_GENERIC_FAULT);
            const networkState = this.AudioInterface.networkState;
            if (networkState === NetworkStates.NETWORK_NO_SOURCE) {
                errors.add(ErrorCodes.MELODY_BAD_SOURCE);
            }
        }

        if (currentState !== 'fetching' && !tracks.length) {
            errors.add(ErrorCodes.MELODY_NO_TRACKS);
        }

        return errors;
    }

    render({ currentState, dragging, volIsDragging, tracks }: Props) {
        const errors = this.getErrors();
        if (errors.size) {
            return <ErrorHandler errors={errors} />;
        }

        const classes = classnames(
            s.Melody,
            s[`Melody--${currentState}`],
            { [s['Melody--isDragging']]: dragging.scrubber || volIsDragging },
        );

        return (
            <div class={classes}>
                <ShapeShifter />
            </div>
        );
    }
}
