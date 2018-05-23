import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';
import TimeProvider from './TimeProvider/';

interface Props extends WithOptionalClassName {
    currentTime: number;
    duration: number;
    getTime: (time: number) => string;
}

const CurrentTimeLeft = ({ currentTime, duration, getTime, className = '' }: Props) => (
    <span class={className} data-melody-time>
        {getTime(duration - currentTime)}
    </span>
);

export default TimeProvider(CurrentTimeLeft);
