import { slowDown, speedUp } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import Dock, { DispatchProps, StateProps } from './Dock';

const mapState = (state: State) => ({
    showDock: state.ui.showDock,
    track: state.audio.tracks[state.audio.currentTrack],
    playbackRate: state.audio.playbackRate,
    coordinates: state.ui.dockCoordinates,
    wrapperId: state.ui.wrapperId,
});

const mapDispatch = dispatch => bindActionCreators({
    speedUp,
    slowDown,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapState, mapDispatch)(Dock);
