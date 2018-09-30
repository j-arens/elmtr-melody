import { WithOptionalClassName } from '@components/type';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import CurrentTrackArtist, { StateProps } from './CurrentTrackArtist';

const mapState = (state: State) => {
    const { audio: { currentTrack, tracks } } = state;
    const activeTrack = tracks[currentTrack];
    return {
        currentTrackArtist: activeTrack.media_details.artist,
    };
};

export default connect<
    StateProps,
    {},
    WithOptionalClassName
>(mapState)(CurrentTrackArtist);
