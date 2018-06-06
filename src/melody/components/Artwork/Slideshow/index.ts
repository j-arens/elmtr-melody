import { WithOptionalClassName } from '@components/type';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Slideshow, { StateProps } from './Slideshow';

const mapStateToProps = (state: State) => ({
    tracks: state.audio.tracks,
    currentTrack: state.audio.currentTrack,
});

export default connect<StateProps, {}, WithOptionalClassName>(mapStateToProps)(Slideshow);
