import {
    nextTrack,
    setFilelength,
    updateCurrentTime,
} from '@redux/modules/audio/actions';
import { cycleState } from '@redux/modules/machine/actions';
import { State } from '@redux/type';
import { MachineAction } from '@state-machine/type';
import { connect } from 'preact-redux';
import Melody, { DispatchProps, StateProps } from './Melody';

const mapState = (state: State) => ({
    currentState: state.machine.currentState,
    lastState: state.machine.lastState,
    tracks: state.audio.tracks,
    currentTrack: state.audio.currentTrack,
    currentTime: state.audio.currentTime,
    dragging: state.ui.dragging,
    volume: state.audio.volume,
    timeSync: state.audio.timeSync,
    repeat: state.audio.repeat,
    playbackRate: state.audio.playbackRate,
});

const mapDispatch = (dispatch) => ({
    cycleState: (action: MachineAction) => dispatch(cycleState(action)),
    updateCurrentTime: (nextTime: number) => dispatch(updateCurrentTime(nextTime)),
    nextTrack: () => dispatch(nextTrack()),
    setFilelength: (length: number) => dispatch(setFilelength(length)),
});

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapState, mapDispatch)(Melody);
