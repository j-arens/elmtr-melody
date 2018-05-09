import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { cycleState, setCurrentTrack } from '@redux/actions';
import { Action } from '@redux/type';
import { MachineAction, MachineStates } from '@state-machine/type';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

interface ContainerProps {
    trackIndex: number;
}

interface Props extends WithOptionalClassName, ContainerProps {
    currentState: MachineStates;
    setTrack: () => Action;
    play: () => Action;
}

const PlayTrackButton = ({
    currentState,
    trackIndex,
    setTrack,
    play,
    className = '',
}: Props) => {
    const handleClick = () => {
        if (currentState === 'playing') {
            setTrack();
        } else {
            setTrack();
            play();
        }
    };
    return (
        <BaseButton
            key="play_track"
            className={`${className} melody-controlBar__catalyst`}
            onClick={handleClick}
        >
            <Icon
                className={s.playbackCtrl__icon}
                name="play"
            />
        </BaseButton>
    );
};

const mapDispatchToProps = (dispatch, { trackIndex }: ContainerProps) => ({
    setTrack: () => dispatch(setCurrentTrack(trackIndex)),
    play: () => dispatch(cycleState('PLAY')),
});

export default connect(null, mapDispatchToProps)(PlayTrackButton);
