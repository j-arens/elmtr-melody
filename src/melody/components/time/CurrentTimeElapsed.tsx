import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';
import TimeProvider from './TimeProvider/';

interface Props extends WithOptionalClassName {
    currentTime: number;
    getTime: (time: number) => string;
}

const CurrentTimeElapsed = ({ currentTime, getTime, className = '' }: Props) => (
    <span class={className} data-melody-time>
        {getTime(currentTime)}
    </span>
);

export default TimeProvider(CurrentTimeElapsed);
