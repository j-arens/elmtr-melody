import ResponsiveBgImage from '@components/Artwork/ResponsiveBgImage';
import { WithOptionalClassName } from '@components/type';
import { Track } from '@redux/type';
import { h } from 'preact';
import LazyLoadSlide from './LazyLoadSlide';
const s = require('./style.scss');

export interface StateProps {
    tracks: Track[];
    currentTrack: number;
}

interface OwnProps extends WithOptionalClassName {
    artworkClassName?: string;
}

type Props = StateProps & OwnProps;

export default ({
    tracks,
    currentTrack,
    className = '',
    artworkClassName = '',
}: Props) => (
    <ul
        class={`${s.Slideshow} ${className}`}
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
                    className={`${s.Slideshow__image} ${artworkClassName}`}
                    artwork={track.artwork}
                />
            </LazyLoadSlide>
        ))}
    </ul>
);
