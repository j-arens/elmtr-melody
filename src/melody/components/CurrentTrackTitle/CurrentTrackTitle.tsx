import { WithOptionalClassName } from '@components/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';

export interface StateProps {
    currentTrackTitle: string;
}

type Props = StateProps & WithOptionalClassName;

export default ({ currentTrackTitle, className = '' }: Props) => (
    <p class={className} {...cySelector('track-title')}>
        {currentTrackTitle}
    </p>
);
