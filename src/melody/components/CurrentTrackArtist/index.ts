import { State } from '@redux/type';
import { connect } from 'preact-redux';
import CurrentTrackArtist, { StateProps } from './CurrentTrackArtist';
import { WithOptionalClassName } from '@components/type';

const mapStateToProps = (state: State) => {
    const { currentTrack, tracks } = state;
    const activeTrack = tracks[currentTrack];
    return {
        currentTrackArtist: activeTrack.media_details.artist,
    };
};

export default connect<StateProps, {}, WithOptionalClassName>(mapStateToProps)(CurrentTrackArtist);
