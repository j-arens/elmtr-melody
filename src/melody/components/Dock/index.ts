import {
    slowDown,
    speedUp,
    toggleDock,
} from '@redux/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Dock from './Dock';

const mapStateToProps = (state: State) => ({
    showDock: state.ui.showDock,
    track: state.tracks[state.currentTrack],
    playbackRate: state.playbackRate,
});

const mapDispatchToProps = dispatch => ({
    toggleDock: () => dispatch(toggleDock()),
    speedUp: () => dispatch(speedUp()),
    slowDown: () => dispatch(slowDown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dock);