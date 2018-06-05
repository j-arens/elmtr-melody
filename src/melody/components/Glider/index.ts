import { triggerTimeSync, updateCurrentTime } from '@redux/modules/audio/actions';
import { toggleGliderDragging } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import DragHelper from '../DragHelper';
import Glider from './Glider';

const mapStateToProps = (state: State) => ({
    currentState: state.state.currentState,
    currentTime: state.audio.currentTime,
    duration: state.audio.filelength,
});

const mapDispatchToProps = (dispatch) => ({
    updateCurrentTime: (updatedTime: number) => dispatch(updateCurrentTime(updatedTime)),
    toggleGliderDragging: () => dispatch(toggleGliderDragging()),
    triggerTimeSync: () => dispatch(triggerTimeSync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DragHelper(Glider));
