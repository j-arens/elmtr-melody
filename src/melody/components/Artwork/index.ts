import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Artwork from './Artwork';

const mapStateToProps = (state: State) => ({
    artworkUrl: state.tracks[state.currentTrack].artwork,
});

export default connect(mapStateToProps)(Artwork);
