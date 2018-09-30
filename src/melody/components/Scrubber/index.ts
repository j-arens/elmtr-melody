import { triggerTimeSync, updateCurrentTime } from '@redux/modules/audio/actions';
import { toggleComponentDragging } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Scrubber, { DispatchProps, StateProps } from './Scrubber';

const mapState = (state: State) => ({
    currentState: state.machine.currentState,
    currentTime: state.audio.currentTime,
    duration: state.audio.filelength,
});

const mapDispatch = (dispatch) => bindActionCreators({
    updateCurrentTime,
    toggleComponentDragging,
    triggerTimeSync,
}, dispatch);

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapState, mapDispatch)(Scrubber);
