import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { cycleState } from '@redux/actions';
import { Action, State } from '@redux/type';
import stateMachine from '@state-machine/index';
import { MachineAction, MachineStates } from '@state-machine/type';
import { formatPlaybackRate } from '@utils/index';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

const mapStateToProps = (state: State) => ({
    currentState: state.currentState,
    playbackRate: state.playbackRate,
});

const mapDispatchToProps = dispatch => ({
    cycleState: (action: MachineAction) => dispatch(cycleState(action)),
});

interface Props extends WithOptionalClassName {
    currentState: MachineStates;
    playbackRate: number;
    cycleState: (action: MachineAction) => Action;
}

function getMachineAction(currentState: MachineStates) {
    switch (currentState) {
        case 'buffering': {
            return 'NOOP';
        }
        case 'playing': {
            return 'STOP';
        }
        case 'stopped': {
            return 'PLAY';
        }
        default: {
            return 'FAILED';
        }
    }
}

const CatalystButton = ({
    playbackRate,
    currentState,
    cycleState,
    className = '',
}: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl`;
    const bufferClass = `${defaultClass} ${s['playbackCtrl--buffering']}`;
    const cycle = () => cycleState(getMachineAction(currentState));
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

export default connect(mapStateToProps, mapDispatchToProps)(CatalystButton);
