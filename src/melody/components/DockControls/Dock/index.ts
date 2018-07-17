import { slowDown, speedUp } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Dock, { DispatchProps, StateProps } from './Dock';

const mapStateToProps = (state: State) => ({
    showDock: state.ui.showDock,
    track: state.audio.tracks[state.audio.currentTrack],
    playbackRate: state.audio.playbackRate,
    coordinates: state.ui.dockCoordinates,
    wrapperId: state.ui.wrapperId,
});

const mapDispatchToProps = dispatch => ({
    speedUp: () => dispatch(speedUp()),
    slowDown: () => dispatch(slowDown()),
});

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapStateToProps, mapDispatchToProps)(Dock);
