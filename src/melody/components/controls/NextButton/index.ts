import { WithOptionalClassName } from '@components/type';
import { nextTrack } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import NextButton, { DispatchProps, StateProps } from './NextButton';

const mapStateToProps = (state: State) => ({
    totalTracks: state.audio.tracks.length,
});

const mapDispatchToProps = dispatch => ({
    nextTrack: () => dispatch(nextTrack()),
});

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapStateToProps, mapDispatchToProps)(NextButton);
