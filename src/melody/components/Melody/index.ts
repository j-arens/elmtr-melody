import {
    getCurrentTime,
    nextTrack,
    setFilelength,
    updateCurrentTime,
} from '@redux/modules/audio/actions';
import { cycleState } from '@redux/modules/machine/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import Melody, { DispatchProps, StateProps } from './Melody';

const mapState = (state: State) => ({
    currentState: state.machine.currentState,
    lastState: state.machine.lastState,
    tracks: state.audio.tracks,
    currentTrack: state.audio.currentTrack,
    dragging: state.ui.dragging,
    volume: state.audio.volume,
    timeSync: state.audio.timeSync,
    repeat: state.audio.repeat,
    playbackRate: state.audio.playbackRate,
});

const mapDispatch = dispatch => bindActionCreators({
    cycleState,
    updateCurrentTime,
    nextTrack,
    setFilelength,
    getCurrentTime,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapState, mapDispatch)(Melody);
