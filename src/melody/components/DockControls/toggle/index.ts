import EditorChangeListener from '@components/EditorChangeListener/';
import { GLOBAL } from '@melody/constants';
import { toggleDock } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators, compose } from 'redux';
import Toggle, { DispatchProps, OwnProps, StateProps } from './Toggle';

const mapState = (state: State) => ({
    showDock: state.ui.showDock,
});

const mapDispatch = dispatch => bindActionCreators({
    toggleDock,
}, dispatch);

export default compose(
    connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch),
    EditorChangeListener,
)(Toggle);
