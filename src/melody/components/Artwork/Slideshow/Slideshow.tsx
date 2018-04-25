import ResponsiveBgImage from '@components/Artwork/ResponsiveBgImage';
import { WithOptionalClassName } from '@components/type';
import { Track } from '@redux/type';
import { h } from 'preact';
const throttle = require('lodash.throttle');
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    tracks: Track[];
    currentTrack: number;
    duration?: number;
    easing?: string;
}

export default ({
    tracks,
    currentTrack,
    className = '',
    duration = 200,
    easing = 'ease-in-out',
}: Props) => {
    return (
        <ul
            class={`${s.Slideshow} ${className}`}
            style={{ transform: `translate3d(${currentTrack * 100}%, 0px, 0px)` }}
        >
            {tracks.map((track, i) => (
                <li
                    class={s.Slideshow__slide}
                    style={{ transition: `transform ${duration}ms ${easing}` }}
                >
                    <ResponsiveBgImage
                        className={s.Slideshow__image}
                        artwork={track.artwork}
                    />
                </li>
            ))}
        </ul>
    );
};
