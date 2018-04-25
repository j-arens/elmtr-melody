import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Slideshow from './Slideshow';

const mapStateToProps = (state: State) => ({
    tracks: state.tracks,
    currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(Slideshow);
