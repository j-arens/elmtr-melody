import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@components/type';
import { Action } from '@redux/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';
const s = require('../styles.scss');

export interface StateProps {
    currentTime: number;
    totalTracks: number;
}

export interface DispatchProps {
    prevTrack: () => Action;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

const isDisabled = (
    totalTracks: number,
    currentTime: number,
): boolean => {
    if (totalTracks < 2 && currentTime <= 0) {
        return true;
    }
    return false;
};

export default ({
    currentTime,
    totalTracks,
    prevTrack,
    className = '',
}: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl`;
    const disabledClass = `${defaultClass} ${s['playbackCtrl--disabled']}`;
    return (
        <BaseButton
            key="prev"
            className={isDisabled(totalTracks, currentTime) ? disabledClass : defaultClass}
            onClick={prevTrack}
            {...cySelector('ctrl', 'prev')}
        >
            <Icon className={s.playbackCtrl__icon} name="prev" />
        </BaseButton>
    );
};
