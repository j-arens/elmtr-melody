import { State } from '@redux/type';
import { connect } from 'preact-redux';
import CurrentTrackTitle from './CurrentTrackTitle';

const mapStateToProps = (state: State) => {
    const { currentTrack, tracks } = state;
    const activeTrack = tracks[currentTrack];
    return {
        trackTitle: activeTrack.media_details.title,
    };
};

export default connect(mapStateToProps)(CurrentTrackTitle);
