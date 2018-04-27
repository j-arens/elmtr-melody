import ResponsiveBgImage from '@components/Artwork/ResponsiveBgImage';
import { WithOptionalClassName } from '@components/type';
import { Track } from '@redux/type';
import { h } from 'preact';
import LazyLoadSlide from './LazyLoadSlide';
const throttle = require('lodash.throttle');
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    tracks: Track[];
    currentTrack: number;
}

export default ({
    tracks,
    currentTrack,
    className = '',
}: Props) => (
    <ul
        class={`${s.Slideshow} ${className}`}
        data-melody-slideshow
        style={{
            transform: `translate3d(${currentTrack * -100}%, 0px, 0px)`,
        }}
    >
        {tracks.map((track, i) => (
            <LazyLoadSlide
                index={i}
                totalTracks={tracks.length}
                className={s.Slideshow__slide}
                currentTrack={currentTrack}
            >
                <ResponsiveBgImage
                    className={s.Slideshow__image}
                    artwork={track.artwork}
                />
            </LazyLoadSlide>
        ))}
    </ul>
);
