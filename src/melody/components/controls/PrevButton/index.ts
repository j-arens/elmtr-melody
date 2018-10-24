import { WithOptionalClassName } from '@components/type';
import { prevTrack } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import PrevButton, { DispatchProps, StateProps } from './PrevButton';

const mapState = (state: State) => ({
    currentTime: state.audio.currentTime,
    totalTracks: state.audio.tracks.length,
});

const mapDispatch = dispatch => bindActionCreators({
    prevTrack,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapState, mapDispatch)(PrevButton);
