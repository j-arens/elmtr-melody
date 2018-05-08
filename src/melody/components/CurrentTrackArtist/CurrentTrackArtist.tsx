import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';

interface Props extends WithOptionalClassName {
    trackArtist: string;
}

export default ({ trackArtist, className = '' }: Props) => (
    <p class={className} data-melody-artist>
        {trackArtist}
    </p>
);
