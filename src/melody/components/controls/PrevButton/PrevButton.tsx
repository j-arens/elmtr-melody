import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { h } from 'preact';
const s = require('../styles.scss');

export interface DispatchProps {
    prevTrack: () => Action;
}

type Props = DispatchProps & WithOptionalClassName;

export default ({ prevTrack, className = '' }: Props) => (
    <BaseButton
        key="prev"
        className={`${className} ${s.playbackCtrl} melody-playbackCtrl`}
        onClick={prevTrack}
    >
        <Icon className={s.playbackCtrl__icon} name="prev" />
    </BaseButton>
);
