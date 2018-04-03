import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';

interface Props extends WithOptionalClassName {
    trackTitle: string;
}

export default ({ trackTitle, className = '' }: Props) => (
    <h1 class={className} data-melody-title>
        {trackTitle}
    </h1>
);
