import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { NO_OP } from '@utils/index';
import { h } from 'preact';
const s = require('../styles.scss');

export interface StateProps {
    totalTracks: number;
}

export interface DispatchProps {
    prevTrack: () => Action;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

export default ({ totalTracks, prevTrack, className = '' }: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl`;
    const disabledClass = `${defaultClass} ${s['playbackCtrl--disabled']}`;
    return (
        <BaseButton
            key="prev"
            className={totalTracks > 1 ? defaultClass : disabledClass}
            onClick={totalTracks > 1 ? prevTrack : NO_OP}
        >
            <Icon className={s.playbackCtrl__icon} name="prev" />
        </BaseButton>
    );
};
