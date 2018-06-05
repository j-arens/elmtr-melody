import {
    nextTrack,
    setFilelength,
    updateCurrentTime,
} from '@redux/modules/audio/actions';
import { cycleState } from '@redux/modules/state/actions';
import { State } from '@redux/type';
import { MachineAction } from '@state-machine/type';
import { connect } from 'preact-redux';
import Melody, { DispatchProps, StateProps } from './Melody';

const mapStateToProps = (state: State) => ({
    currentState: state.state.currentState,
    lastState: state.state.lastState,
    tracks: state.audio.tracks,
    currentTrack: state.audio.currentTrack,
    currentTime: state.audio.currentTime,
    gliderIsDragging: state.ui.gliderIsDragging,
    volIsDragging: state.ui.volIsDragging,
    volume: state.audio.volume,
    timeSync: state.audio.timeSync,
    repeat: state.audio.repeat,
    playbackRate: state.audio.playbackRate,
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
