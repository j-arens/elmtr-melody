import { WithOptionalClassName } from '@components/type';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import CurrentTrackTitle, { StateProps } from './CurrentTrackTitle';

const mapState = (state: State) => {
    const { audio: { currentTrack, tracks } } = state;
    const activeTrack = tracks[currentTrack];
    return {
        currentTrackTitle: activeTrack.media_details.title,
    };
};

export default connect<
    StateProps,
    {},
    WithOptionalClassName
>(mapState)(CurrentTrackTitle);
