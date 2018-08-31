import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@components/type';
import { Action } from '@redux/type';
import { cySelector } from '@utils/index';
import { h } from 'preact';
const s = require('../styles.scss');

export interface StateProps {
    shuffle: boolean;
}

export interface DispatchProps {
    toggleShuffle: () => Action;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

export default ({ shuffle, toggleShuffle, className = '' }: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl melody-shuffle`;
    const activeClass = `${defaultClass} ${s['playbackCtrl--active']} melody-c-shuffle-on`;
    return (
        <BaseButton
            key="shuffle"
            className={shuffle ? activeClass : defaultClass}
            onClick={toggleShuffle}
            {...cySelector('ctrl', 'shuffle')}
        >
            <Icon className={s.playbackCtrl__icon} name="shuffle" />
        </BaseButton>
    );
};
