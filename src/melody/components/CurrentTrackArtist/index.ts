import { State } from '@redux/type';
import { connect } from 'preact-redux';
import CurrentTrackArtist from './CurrentTrackArtist';

const mapStateToProps = (state: State) => {
    const { currentTrack, tracks } = state;
    const activeTrack = tracks[currentTrack];
    return {
        trackArtist: activeTrack.media_details.artist,
    };
};

export default connect(mapStateToProps)(CurrentTrackArtist);
