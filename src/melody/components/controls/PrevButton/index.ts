import { WithOptionalClassName } from '@components/type';
import { prevTrack } from '@redux/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import PrevButton, { DispatchProps, StateProps } from './PrevButton';

const mapStateToProps = (state: State) => ({
    totalTracks: state.tracks.length,
});

const mapDispatchToProps = dispatch => ({
    prevTrack: () => dispatch(prevTrack()),
});

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapStateToProps, mapDispatchToProps)(PrevButton);
