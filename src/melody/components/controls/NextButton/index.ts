import { WithOptionalClassName } from '@components/type';
import { nextTrack } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import NextButton, { DispatchProps, StateProps } from './NextButton';

const mapState = (state: State) => ({
    totalTracks: state.audio.tracks.length,
});

const mapDispatch = dispatch => bindActionCreators({
    nextTrack,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapState, mapDispatch)(NextButton);
