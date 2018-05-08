import { PassedProps } from '@components/Tracklist/Tracklist';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import TracklistItem from './TracklistItem';

const mapStateToProps = (state: State, passedProps: PassedProps) => ({
    currentState: state.currentState,
    currentTrack: state.currentTrack,
    ...passedProps,
});

export default connect(mapStateToProps)(TracklistItem);
