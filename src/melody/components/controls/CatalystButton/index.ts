import { WithOptionalClassName } from '@components/type';
import { cycleState } from '@redux/modules/machine/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import CatalystButton, { DispatchProps, StateProps } from './CatalystButton';

const mapState = (state: State) => ({
    currentState: state.machine.currentState,
    playbackRate: state.audio.playbackRate,
});

const mapDispatch = dispatch => bindActionCreators({
    cycleState,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapState, mapDispatch)(CatalystButton);
