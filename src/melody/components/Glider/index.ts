import {
    toggleGliderDragging,
    triggerTimeSync,
    updateCurrentTime,
} from '@redux/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import DragHelper from '../DragHelper';
import Glider from './Glider';

const mapStateToProps = (state: State) => {
    const { currentState, currentTime, currentTrack, tracks } = state;
    const activeTrack = tracks[currentTrack];
    return {
        currentState,
        currentTime,
        duration: activeTrack.media_details.length,
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateCurrentTime: (updatedTime: number) => dispatch(updateCurrentTime(updatedTime)),
    toggleGliderDragging: () => dispatch(toggleGliderDragging()),
    triggerTimeSync: () => dispatch(triggerTimeSync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DragHelper(Glider));
