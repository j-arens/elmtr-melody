import { WithOptionalClassName } from '@components/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';

export interface StateProps {
    currentTrackArtist: string;
}

type Props = StateProps & WithOptionalClassName;

export default ({ currentTrackArtist, className = '' }: Props) => (
    <p class={className} {...cySelector('track-artist')}>
        {currentTrackArtist}
    </p>
);
