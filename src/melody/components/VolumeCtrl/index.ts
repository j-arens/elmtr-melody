import DragHelper from '@components/DragHelper/';
import { WithOptionalClassName } from '@melody/components/type';
import { toggleVolDragging, updateVolume } from '@redux/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { compose } from 'redux';
import VolumeCtrl, { DispatchProps, StateProps } from './VolumeCtrl';

const mapStateToProps = (state: State) => ({
    volume: state.volume,
});

const mapDispatchToProps = (dispatch) => ({
    toggleVolDragging: () => dispatch(toggleVolDragging()),
    updateVolume: (newLevel: number) => dispatch(updateVolume(newLevel)),
});

// @TODO: update preact for better types, make this work
// export default compose(
//     connect<StateProps, DispatchProps, WithOptionalClassName>(mapStateToProps, mapDispatchToProps),
//     DragHelper,
//     VolumeCtrl,
// );

export default connect<
    StateProps,
    DispatchProps,
    WithOptionalClassName
>(mapStateToProps, mapDispatchToProps)(DragHelper(VolumeCtrl));
