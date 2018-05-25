import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import stateMachine from '@state-machine/index';
import { MachineAction, MachineStates } from '@state-machine/type';
import {
    formatPlaybackRate,
    getNextMachineAction,
} from '@utils/index';
import { h } from 'preact';
const s = require('../styles.scss');

export interface StateProps {
    currentState: MachineStates;
    playbackRate: number;
}

export interface DispatchProps {
    cycleState: (action: MachineAction) => Action;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

export default ({
    playbackRate,
    currentState,
    cycleState,
    className = '',
}: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl`;
    const bufferClass = `${defaultClass} ${s['playbackCtrl--buffering']}`;
    const cycle = () => cycleState(getNextMachineAction(currentState));
    return (currentState === 'buffering' ?
        <BaseButton
            key="catalyst"
            className={`${bufferClass} melody-controlBar__catalyst`}
            data-playbackRate=""
        >
            <Icon className={s.playbackCtrl__icon} name="buffer" />
        </BaseButton>
        :
        <BaseButton
            key="catalyst"
            className={`${defaultClass} melody-controlBar__catalyst`}
            onClick={cycle}
            data-playbackRate={formatPlaybackRate(playbackRate)}
        >
            <Icon
                className={s.playbackCtrl__icon}
                name={currentState !== 'playing' ? 'play' : 'pause'}
            />
        </BaseButton>
    );
};
