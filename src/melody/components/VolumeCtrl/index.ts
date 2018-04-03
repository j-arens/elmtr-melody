import DragHelper from '@components/DragHelper/';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import {
    toggleVolDragging,
    updateVolume,
} from '../../redux/actions';
import VolumeCtrl from './VolumeCtrl';

const mapStateToProps = (state: State) => ({
    volume: state.volume,
});

const mapDispatchToProps = (dispatch) => ({
    toggleVolDragging: () => dispatch(toggleVolDragging()),
    updateVolume: (newLevel: number) => dispatch(updateVolume(newLevel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DragHelper(VolumeCtrl));
