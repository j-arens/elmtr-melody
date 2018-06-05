import { WithOptionalClassName } from '@components/type';
import { toggleRepeat } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import RepeatButton, { DispatchProps, StateProps } from './RepeatButton';

const mapStateToProps = (state: State) => ({
    repeat: state.audio.repeat,
});

const mapDispatchToProps = dispatch => ({
    toggleRepeat: () => dispatch(toggleRepeat()),
});

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapStateToProps, mapDispatchToProps)(RepeatButton);
