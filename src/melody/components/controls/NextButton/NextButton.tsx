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
    nextTrack: () => Action;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

export default ({ totalTracks, nextTrack, className = '' }: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl`;
    const disabledClass = `${defaultClass} ${s['playbackCtrl--disabled']}`;
    return (
        <BaseButton
            key="next"
            className={totalTracks > 1 ? defaultClass : disabledClass}
            onClick={totalTracks > 1 ? nextTrack : NO_OP}
        >
            <Icon className={s.playbackCtrl__icon} name="next" />
        </BaseButton>
    );
};
