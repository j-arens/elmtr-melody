import AudioInterface, { Props as AudioInterfaceProps } from '@components/AudioInterface/';
import { AudioInterfaceState } from '@components/AudioInterface/type';
import { ErrorCodes } from '@components/Fault/codes';
import ErrorHandler from '@components/Fault/ErrorHandler';
import ShapeShifter from '@components/ShapeShifter/';
import { GLOBAL } from '@melody/constants';
import { Dragging } from '@redux/modules/ui/type';
import { Track } from '@redux/type';
import { Action } from '@redux/type';
import { MachineAction, MachineStates } from '@state-machine/type';
import { NetworkStates, timeout } from '@utils/index';
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
    lastTimeSync: number = 0;

    interfaceRef: HTMLAudioElement;

    componentDidUpdate(prevProps: Props) {
        this.lastTimeSync = prevProps.timeSync;
    }

    setInterfaceRef = (ref: HTMLAudioElement) => {
        this.interfaceRef = ref;
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

    onInterfaceReady = () => {
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

    onInterfaceError = (e) => {
        const { cycleState } = this.props;
        cycleState('FAILED');
    }

    onInterfaceTimeUpdate = (nextTime: number) => {
        const { currentTime, updateCurrentTime, dragging } = this.props;
        if (nextTime === currentTime || dragging.scrubber) {
            return;
        }
        updateCurrentTime(nextTime);
    }

    onInterfaceEnded = () => {
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

    onInterfaceLoadedMeta = ({ duration }: HTMLAudioElement) => {
        const { setFilelength } = this.props;
        setFilelength(duration);
    }

    getSrc(): string {
        const { tracks, currentTrack } = this.props;
        if (!tracks.length || !tracks[currentTrack]) {
            return '';
        }
        return tracks[currentTrack].source_url;
    }

    maybeOverrideCurrentTime() {
        const { timeSync, currentTime } = this.props;
        if (timeSync !== this.lastTimeSync) {
            return { overrideCurrentTime: currentTime };
        }
        return {};
    }

    mapAudioProps = (): AudioInterfaceProps => ({
        src: this.getSrc(),
        play: this.props.currentState === 'playing',
        volume: this.props.volume,
        repeat: this.props.repeat,
        playbackRate: this.props.playbackRate,
        onBuffering: this.onInterfaceBuffering,
        onReady: this.onInterfaceReady,
        onLoadedMeta: this.onInterfaceLoadedMeta,
        onEnded: this.onInterfaceEnded,
        onTimeUpdate: this.onInterfaceTimeUpdate,
        onError: this.onInterfaceError,
        interfaceRef: this.setInterfaceRef,
        ...this.maybeOverrideCurrentTime(),
    })

    getErrors(): Set<ErrorCodes> {
        const { currentState, tracks } = this.props;
        const errors = new Set();

        if (currentState === 'fault') {
            errors.add(ErrorCodes.MELODY_GENERIC_FAULT);
            if (this.interfaceRef) {
                const networkState = this.interfaceRef.networkState;
                if (networkState === NetworkStates.NETWORK_NO_SOURCE) {
                    errors.add(ErrorCodes.MELODY_BAD_SOURCE);
                }
            }
        }

        if (currentState !== 'fetching' && !tracks.length) {
            errors.add(ErrorCodes.MELODY_NO_TRACKS);
        }

        return errors;
    }

    render({ currentState, dragging, tracks }: Props) {
        const errors = this.getErrors();
        if (errors.size) {
            return <ErrorHandler errors={errors} />;
        }

        const classes = classnames(
            s.Melody,
            s[`Melody--${currentState}`],
            { [s['Melody--isDragging']]: dragging.scrubber || dragging.volume },
        );

        return (
            <div class={classes}>
                <ShapeShifter />
                <AudioInterface {...this.mapAudioProps()} />
            </div>
        );
    }
}
