import { GLOBAL } from '@constants';
import { Component, h } from 'preact';
import { EventsMap, MediaStreamEventHandler } from './type';

export interface Props {
    src: string;
    volume?: number;
    play: boolean;
    repeat?: boolean;
    overrideCurrentTime?: number;
    playbackRate?: number;
    onBuffering?: MediaStreamEventHandler;
    onReady?: MediaStreamEventHandler;
    onLoadedMeta?: (audioInterface: HTMLAudioElement) => any;
    onEnded?: MediaStreamEventHandler;
    onTimeUpdate?: (nextTime: number) => any;
    onError?: MediaStreamEventHandler;
    interfaceRef?: (audio: HTMLAudioElement) => any;
}

export default class extends Component<Props, {}> {
    protected Audio: HTMLAudioElement = new GLOBAL.Audio();

    protected eventsMap: EventsMap = {
        waiting: 'onBuffering',
        canplay: 'onReady',
        timeupdate: 'onTimeUpdate',
        ended: 'onEnded',
        loadedmetadata: 'onLoadedMeta',
        error: 'onError',
    };

    set src(src: string) {
        if (src === this.Audio.src) {
            return;
        }
        const wasPaused = this.Audio.paused;
        this.play = false;
        this.Audio.src = src;
        this.Audio.load();
        if (!wasPaused) {
            this.play = true;
        }
    }

    set play(shouldPlay: boolean) {
        const isPaused = this.Audio.paused;
        if (isPaused && shouldPlay) {
            this.Audio.play().catch(this.onPlayError);
        } else if (!isPaused && !shouldPlay) {
            this.Audio.pause();
        }
    }

    set overrideCurrentTime(nextTime: number) {
        if (nextTime > this.Audio.duration) {
            // the ended event doesn't reliably fire on time when setting
            // the currentTime to a value that is equal to or greater than
            // the duration of the current source
            this.Audio.currentTime = this.Audio.duration - 0.1;
            return;
        }
        if (nextTime < 0) {
            this.Audio.currentTime = 0;
            return;
        }
        if (this.Audio.currentTime !== nextTime) {
            this.Audio.currentTime = nextTime;
        }
    }

    set volume(volume: number) {
        this.Audio.volume = volume;
    }

    set repeat(shouldRepeat: boolean) {
        this.Audio.loop = shouldRepeat;
    }

    set playbackRate(rate: number) {
        this.Audio.playbackRate = rate;
    }

    componentDidMount() {
        if (process.env.NODE_ENV !== 'production') {
            GLOBAL.MELODY.audioInterface = this.Audio;
        }
        const { interfaceRef } = this.props;
        if (interfaceRef && typeof interfaceRef === 'function') {
            interfaceRef(this.Audio);
        }
        Object.keys(this.eventsMap).forEach(e => this.Audio.addEventListener(e, this.handleEvent));
        const diff = this.diffProps({});
        this.updateProperties(diff);
    }

    componentWillUnmount() {
        Object.keys(this.eventsMap).forEach(e => this.Audio.removeEventListener(e, this.handleEvent));
        delete this.Audio;
    }

    componentDidUpdate(prevProps: Props) {
        const diff = this.diffProps(prevProps);
        this.updateProperties(diff);
    }

    updateProperties(props: Partial<Props>) {
        Object.entries(props).forEach(([key, value]) => this[key] = value);
    }

    diffProps(prevProps: Partial<Props>): Partial<Props> {
        return Object.entries(this.props).reduce((diff, [key, value]) => {
            if (typeof value !== 'function' && this.props[key] !== prevProps[key]) {
                diff[key] = value;
            }
            return diff;
        }, {});
    }

    handleEvent = (e: MediaStreamEvent) => {
        const { type } = e;
        const handler = this.eventsMap[type];
        if (this.props[handler] && typeof this.props[handler] === 'function') {
            switch (type) {
                case 'ended': {
                    // don't interrupt playback
                    if (this.props.play) {
                        this.play = true;
                    }
                    this.props[handler](e);
                    break;
                }
                case 'loadedmetadata':
                    this.props[handler](this.Audio);
                    break;
                case 'timeupdate':
                    this.props[handler](this.Audio.currentTime);
                    break;
                default:
                    this.props[handler](e);
                    break;
            }
        }
    }

    onPlayError = (e) => {
        const { onError } = this.props;
        if (e.name && e.name !== 'AbortError' && typeof onError === 'function') {
            console.error('Melody', Error(e));
            onError(e);
        }
    }

    render() {
        return null;
    }
}
