import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@components/type';
import { Action } from '@redux/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';
const s = require('../styles.scss');

export interface StateProps {
    repeat: boolean;
}

export interface DispatchProps {
    toggleRepeat: () => Action;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

export default ({ repeat, toggleRepeat, className = '' }: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl melody-repeat`;
    const activeClass = `${defaultClass} ${s['playbackCtrl--active']} melody-c-repeat-on`;
    return (
        <BaseButton
            key="repeat"
            className={repeat ? activeClass : defaultClass}
            onClick={toggleRepeat}
            {...cySelector('ctrl')}
        >
            <Icon className={s.playbackCtrl__icon} name="repeat" />
        </BaseButton>
    );
};
