import EditorChangeListener from '@components/EditorChangeListener/';
import { GLOBAL } from '@melody/constants';
import { toggleDock } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { compose } from 'redux';
import Toggle, { DispatchProps, OwnProps, StateProps } from './Toggle';

const { jQuery: $ } = GLOBAL;

const mapState = (state: State) => ({
    showDock: state.ui.showDock,
    wrapperId: state.ui.wrapperId,
});

// @TODO: move this logic into a reducer
const mapDispatch = dispatch => ({
    toggleDock: (target: EventTarget, wrapperId: string) => {
        const el = document.getElementById(`melody-widgetRoot:${wrapperId}`);
        const wrapperRect = $(el)
            .closest('.elementor-section')
            .get(0)
            .getBoundingClientRect();
        const toggleRect = (target as HTMLElement).getBoundingClientRect();
        return dispatch(toggleDock({
            width: toggleRect.width,
            x: toggleRect.left - wrapperRect.left,
            y: toggleRect.bottom - wrapperRect.top,
        }));
    },
});

export default compose(
    connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch),
    EditorChangeListener,
)(Toggle);
