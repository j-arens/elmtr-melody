import { WithOptionalClassName } from '@components/type';
import { toggleShuffle } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import ShuffleButton, { DispatchProps, StateProps } from './ShuffleButton';

const mapState = (state: State) => ({
    shuffle: state.audio.shuffle,
});

const mapDispatch = dispatch => bindActionCreators({
    toggleShuffle,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapState, mapDispatch)(ShuffleButton);
