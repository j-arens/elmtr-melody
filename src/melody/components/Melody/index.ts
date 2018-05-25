import {
    cycleState,
    nextTrack,
    setFilelength,
    updateCurrentTime,
} from '@redux/actions';
import { State } from '@redux/type';
import { MachineAction } from '@state-machine/type';
import { connect } from 'preact-redux';
import Melody, { DispatchProps, StateProps } from './Melody';

const mapStateToProps = (state: State) => ({
    currentState: state.currentState,
    lastState: state.lastState,
    tracks: state.tracks,
    currentTrack: state.currentTrack,
    currentTime: state.currentTime,
    gliderIsDragging: state.ui.gliderIsDragging,
    volIsDragging: state.ui.volIsDragging,
    volume: state.volume,
    timeSync: state.timeSync,
    repeat: state.repeat,
    playbackRate: state.playbackRate,
});

const mapDispatchToProps = (dispatch) => ({
    cycleState: (action: MachineAction) => dispatch(cycleState(action)),
    updateCurrentTime: (nextTime: number) => dispatch(updateCurrentTime(nextTime)),
    nextTrack: () => dispatch(nextTrack()),
    setFilelength: (length: number) => dispatch(setFilelength(length)),
});

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapStateToProps, mapDispatchToProps)(Melody);
