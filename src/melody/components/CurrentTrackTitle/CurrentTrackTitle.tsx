import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';

export interface StateProps {
    currentTrackTitle: string;
}

type Props = StateProps & WithOptionalClassName;

export default ({ currentTrackTitle, className = '' }: Props) => (
    <p class={className} data-melody-title>
        {currentTrackTitle}
    </p>
);
