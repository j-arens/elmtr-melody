import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';

export interface StateProps {
    currentTrackArtist: string;
}

type Props = StateProps & WithOptionalClassName;

export default ({ currentTrackArtist, className = '' }: Props) => (
    <p class={className}>
        {currentTrackArtist}
    </p>
);
