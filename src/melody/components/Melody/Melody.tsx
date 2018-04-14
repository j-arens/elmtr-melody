import DefaultError from '@components/Fault/DefaultError';
import FaultContainer from '@components/Fault/FaultContainer';
import NoTracksEditor from '@components/Fault/NoTracksEditor';
import NoTracksFront from '@components/Fault/NoTracksFront';
import ShapeShifter from '@components/ShapeShifter/';
import { GLOBAL } from '@constants';
import { Track } from '@redux/type';
import { Action } from '@redux/type';
import { MachineAction, MachineStates } from '@state-machine/type';
import { getRandomNumInRange, timeout } from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
const s = require('./style.scss');

interface Props {
    currentState: MachineStates;
    lastState: MachineStates;
    tracks: Track[];
    currentTrack: number;
    currentTime: number;
    gliderIsDragging: boolean;
    volIsDragging: boolean;
    volume: number;
    timeSync: number;
    repeat: boolean;
    playbackRate: number;
    cycleState: (action: MachineAction) => Action;
    updateCurrentTime: (nextTime: number) => Action;
    nextTrack: () => Action;
}

export default class Melody extends Component<Props, {}> {
    AudioInterface: HTMLAudioElement = new Audio();

    componentDidMount() {
        this.bindAudioInterfaceEvents();
        this.setInterfaceSource(this.props);
    }

    componentWillUnmount() {
        this.removeAudioInterfaceEvents();
    }

    componentWillReceiveProps(nextProps: Props) {
        const stateChanged = nextProps.currentState !== this.props.currentState;
        const volumeChanged = nextProps.volume !== this.props.volume;
        const tracksChanged = nextProps.tracks !== this.props.tracks;
        const currentTrackChanged = nextProps.currentTrack !== this.props.currentTrack;
        const timeSyncChanged = nextProps.timeSync !== this.props.timeSync;
        const repeatChanged = nextProps.repeat !== this.props.repeat;
        const playbackRateChanged = nextProps.playbackRate !== this.props.playbackRate;

        if (stateChanged) {
            this.updateInterfaceState(nextProps.currentState);
        }

        if (tracksChanged || currentTrackChanged) {
            this.setInterfaceSource(nextProps);
        }

        if (volumeChanged) {
            this.setInterfaceVolume(nextProps.volume);
        }

        if (timeSyncChanged) {
            this.setInterfaceTime(nextProps.currentTime);
        }

        if (repeatChanged) {
            this.setInterfaceRepeat(nextProps.repeat);
        }

        if (playbackRateChanged) {
            this.setInterfacePlaybackRate(nextProps.playbackRate);
        }
    }

    bindAudioInterfaceEvents() {
        this.AudioInterface.addEventListener('waiting', this.onInterfaceBuffering);
        this.AudioInterface.addEventListener('canplay', this.onCanPlay);
        this.AudioInterface.addEventListener('timeupdate', this.onTimeUpdate);
        this.AudioInterface.addEventListener('ended', this.onEnded);
    }

    removeAudioInterfaceEvents() {
        this.AudioInterface.removeEventListener('waiting', this.onInterfaceBuffering);
        this.AudioInterface.removeEventListener('canplay', this.onCanPlay);
        this.AudioInterface.removeEventListener('timeupdate', this.onTimeUpdate);
        this.AudioInterface.removeEventListener('ended', this.onEnded);
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
            cycleState('FAILED');
        }
    }

    onTimeUpdate = () => {
        const nextTime = Number(this.AudioInterface.currentTime.toFixed(0));
        const { currentTime, updateCurrentTime, gliderIsDragging } = this.props;

        if (nextTime === currentTime || gliderIsDragging) {
            return;
        }

        updateCurrentTime(nextTime);
    }

    onEnded = () => {
        const { nextTrack, repeat } = this.props;

        if (repeat) {
            return;
        }

        nextTrack();
    }

    getMachineAction() {
        const { currentState } = this.props;
    }

    render({ currentState, gliderIsDragging, volIsDragging, tracks }: Props) {
        const classes = classnames(
            s.Melody, s[`Melody--${currentState}`],
            { [s['Melody--isDragging']]: gliderIsDragging || volIsDragging },
        );

        if (currentState !== 'fetching' && !tracks.length) {
            if (GLOBAL.elementorFrontend && GLOBAL.elementorFrontend.isEditMode()) {
                return (
                    <FaultContainer allowReload={false}>
                        <NoTracksEditor />
                    </FaultContainer>
                );
            }
            return (
                <FaultContainer allowReload={false}>
                    <NoTracksFront />
                </FaultContainer>
            );
        }

        if (currentState === 'fault') {
            return (
                <FaultContainer allowReload>
                    <DefaultError />
                </FaultContainer>
            );
        }

        return (
            <div class={classes} data-melody-border>
                <ShapeShifter />
            </div>
        );
    }
}
