import { State } from '@redux/type';
import { connect } from 'preact-redux';
import TrackTitle from './TrackTitle';

const mapStateToProps = (state: State) => {
    const { currentTrack, tracks } = state;
    const activeTrack = tracks[currentTrack];
    return {
        trackTitle: activeTrack.media_details.title,
    };
};

export default connect(mapStateToProps)(TrackTitle);
