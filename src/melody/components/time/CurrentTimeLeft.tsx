import { WithOptionalClassName } from '@components/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';
import TimeProvider from './TimeProvider/';

interface Props extends WithOptionalClassName {
    currentTime: number;
    duration: number;
    getTime: (time: number) => string;
}

export const CurrentTimeLeft = ({ currentTime, duration, getTime, className = '' }: Props) => (
    <span class={className} {...cySelector('time-left')}>
        {getTime(duration - currentTime)}
    </span>
);

export default TimeProvider(CurrentTimeLeft);
