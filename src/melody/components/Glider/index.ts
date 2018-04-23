import {
    toggleGliderDragging,
    triggerTimeSync,
    updateCurrentTime,
} from '@redux/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import DragHelper from '../DragHelper';
import Glider from './Glider';

const mapStateToProps = (state: State) => ({
    currentState: state.currentState,
    currentTime: state.currentTime,
    duration: state.filelength,
});

const mapDispatchToProps = (dispatch) => ({
    updateCurrentTime: (updatedTime: number) => dispatch(updateCurrentTime(updatedTime)),
    toggleGliderDragging: () => dispatch(toggleGliderDragging()),
    triggerTimeSync: () => dispatch(triggerTimeSync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DragHelper(Glider));
