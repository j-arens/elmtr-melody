import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { cycleState, setCurrentTrack } from '@redux/actions';
import { Action } from '@redux/type';
import { MachineAction, MachineStates } from '@state-machine/type';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

interface Props extends WithOptionalClassName {
    currentState: MachineStates;
    trackIndex: number;
    setTrack: () => Action;
    cycleState: (action: MachineAction) => Action;
}

const PlayTrackButton = ({
    currentState,
    trackIndex,
    setTrack,
    className = '',
}: Props) => {
    const handleClick = () => {
        if (currentState === 'playing') {
            setTrack();
        } else {
            setTrack();
            cycleState('PLAY');
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

const mapDispatchToProps = (dispatch, { trackIndex }: Props) => ({
    setTrack: () => dispatch(setCurrentTrack(trackIndex)),
    cycleState: (action: MachineAction) => dispatch(cycleState(action)),
});

export default connect(null, mapDispatchToProps)(PlayTrackButton);
