import { Track } from '@redux/type';

/**
 * NOOP
 */
export const NO_OP = () => {}; // tslint:disable-line no-empty

/**
 * Event layerX polyfill
 */
export function getLayerX(node: HTMLElement, clientX: number): number {
    let el: any = node;
    let x: number = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        el = el.offsetParent;
    }

    return clientX - x;
}

/**
 * Get a random number within a range
 */
export function getRandomNumInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Get a random track index
 */
export function shuffleTracks(tracks: Track[], currentTrack: number): number {
    let index = getRandomNumInRange(0, tracks.length);

    while (index === currentTrack) {
        index = getRandomNumInRange(0, tracks.length);
    }

    return index;
}

/**
 * Turn a timestamp into a formatted time string
 */
export function formatTime(time: number): string {
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.floor((time % 3600) / 60);
    const seconds: number = time % 60;
    let formatted: string = '';

    if (hours > 0) {
        formatted += `${hours}:${minutes < 10 ? '0' : ''}`;
    }

    formatted += `${minutes}:${seconds < 10 ? '0' : ''}`;
    formatted += seconds;
    return formatted;
}

/**
 * Run an abritrary timer
 */
export function timeout(
    milliseconds: number = 0,
    onTimeout: () => any = () => {}, // tslint:disable-line
): () => void {
    let elapsed: number = 0;
    const interval = setInterval(() => {
        if (elapsed >= (milliseconds / 1000)) {
            onTimeout();
            clearInterval(interval);
        }
        elapsed++;
    }, 1000);
    return () => clearInterval(interval);
}

/**
 * Format the playback rate for display
 */
export function formatPlaybackRate(rate: number): string {
    if (rate === 1) {
        return '';
    }
    if (rate < 1) {
        return `-${Math.abs(rate)}`;
    }
    return `x${rate}`;
}

/**
 * Takes a url and returns a background image css property
 */
// export function getArtworkCss(url: string): object {
//     return {
//         backgroundImage: `url(${url})`,
//     };
// }
