import { WithOptionalClassName } from '@components/type';
import { toggleRepeat } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import RepeatButton, { DispatchProps, StateProps } from './RepeatButton';

const mapState = (state: State) => ({
    repeat: state.audio.repeat,
});

const mapDispatch = dispatch => bindActionCreators({
    toggleRepeat,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapState, mapDispatch)(RepeatButton);
