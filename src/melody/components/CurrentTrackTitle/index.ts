import { WithOptionalClassName } from '@components/type';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import CurrentTrackTitle, { StateProps } from './CurrentTrackTitle';

const mapStateToProps = (state: State) => {
    const { currentTrack, tracks } = state;
    const activeTrack = tracks[currentTrack];
    return {
        currentTrackTitle: activeTrack.media_details.title,
    };
};

export default connect<StateProps, {}, WithOptionalClassName>(mapStateToProps)(CurrentTrackTitle);
