import { WithOptionalClassName } from '@components/type';
import { cycleState } from '@redux/modules/machine/actions';
import { State } from '@redux/type';
import { MachineAction } from '@state-machine/type';
import { connect } from 'preact-redux';
import CatalystButton, { DispatchProps, StateProps } from './CatalystButton';

const mapState = (state: State) => ({
    currentState: state.machine.currentState,
    playbackRate: state.audio.playbackRate,
});

const mapDispatch = dispatch => ({
    cycleState: (action: MachineAction) => dispatch(cycleState(action)),
});

export default connect<StateProps, DispatchProps, WithOptionalClassName>(mapState, mapDispatch)(CatalystButton);
