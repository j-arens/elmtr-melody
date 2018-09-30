import DragHelper from '@components/DragHelper/';
import { WithOptionalClassName } from '@melody/components/type';
import { updateVolume } from '@redux/modules/audio/actions';
import { toggleComponentDragging } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators, compose } from 'redux';
import VolumeCtrl, { DispatchProps, StateProps } from './VolumeCtrl';

const mapState = (state: State) => ({
    volume: state.audio.volume,
});

const mapDispatch = dispatch => bindActionCreators({
    toggleComponentDragging,
    updateVolume,
}, dispatch);

export default compose(
    connect<StateProps, DispatchProps, WithOptionalClassName>(mapState, mapDispatch),
    DragHelper,
)(VolumeCtrl);
