import { WithOptionalClassName } from '@melody/components/type';
import { h } from 'preact';

interface Props extends WithOptionalClassName {
    artworkUrl: string;
}

export default ({ artworkUrl, className = '' }) => (
    <figure
        class={className}
        data-melody-artwork
        style={{ backgroundImage: `url(${artworkUrl})` }}
    />
);
