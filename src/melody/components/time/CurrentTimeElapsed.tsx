import { WithOptionalClassName } from '@components/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';
import TimeProvider from './TimeProvider/';

interface Props extends WithOptionalClassName {
    currentTime: number;
    getTime: (time: number) => string;
}

export const CurrentTimeElapsed = ({ currentTime, getTime, className = '' }: Props) => (
    <span class={className} {...cySelector('time-elapsed')}>
        {getTime(currentTime)}
    </span>
);

export default TimeProvider(CurrentTimeElapsed);
