import { toggleDock } from '@redux/modules/ui/actions';
import { slowDown, speedUp } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Dock, { DispatchProps, OwnProps, StateProps } from './Dock';

const mapStateToProps = (state: State) => ({
    showDock: state.ui.showDock,
    track: state.audio.tracks[state.audio.currentTrack],
    playbackRate: state.audio.playbackRate,
});

const mapDispatchToProps = dispatch => ({
    toggleDock: () => dispatch(toggleDock()),
    speedUp: () => dispatch(speedUp()),
    slowDown: () => dispatch(slowDown()),
});

export default connect<
    StateProps,
    DispatchProps,
    OwnProps
>(mapStateToProps, mapDispatchToProps)(Dock);
