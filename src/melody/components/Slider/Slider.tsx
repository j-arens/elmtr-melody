import { h } from 'preact';
import { Track } from '@redux/type';
const s = require('./style.scss');

interface Props {
    tracks: Track[];
    currentTrack: number;
};

export default ({ tracks, currentTrack }: Props) => {
    const makeResponsive = (track) => {
        const { artwork: { sizes } } = track;
        let srcsetAttr = '';
        // let sizesAttr = '';

        sizes.forEach(size => {
            srcsetAttr = `${srcsetAttr} ${size.uri} ${size.width}w,`;
            // sizesAttr = `${sizesAttr} (max-width: ${size.width}px) ${size.width}px,`
        });

        return {
            srcset: srcsetAttr.trim(),
            // sizes: sizesAttr.trim(),
        };
    };

    return (
        <ul
            class={s.Artwork__Slider}
            style={{ transform: `translate3d(${currentTrack * 100}%, 0px, 0px)` }}
        >
            {tracks.map((track, i) => (
                <li class={s.Artwork__Slider__slider}>
                    <img
                        src={track.artwork.source_url}
                        {...makeResponsive(track)}
                    />
                </li>
            ))}
        </ul>
    );
}
