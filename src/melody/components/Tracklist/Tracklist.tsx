import { WithOptionalClassName } from '@melody/components/type';
import { Track } from '@redux/type';
import { h } from 'preact';

export interface PassedProps {
    track: Track;
    index: number;
}

interface Props extends WithOptionalClassName {
    tracks: Track[];
    currentTrack: number;
    renderItem: (props: PassedProps) => JSX.Element;
}

export default ({
    tracks,
    currentTrack,
    renderItem,
    className = '',
}: Props) => (
    <ul class={className}>
        {tracks.map((track, index) => renderItem({ track, index }))}
    </ul>
);
