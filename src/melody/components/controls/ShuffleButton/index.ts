import { WithOptionalClassName } from '@components/type';
import { toggleShuffle } from '@redux/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import ShuffleButton, { DispatchProps, StateProps } from './ShuffleButton';

const mapStateToProps = (state: State) => ({
    shuffle: state.shuffle,
});

const mapDispatchToProps = dispatch => ({
    toggleShuffle: () => dispatch(toggleShuffle()),
});

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapStateToProps, mapDispatchToProps)(ShuffleButton);
