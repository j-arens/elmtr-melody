import { GLOBAL } from '@melody/constants';
import { toggleDock } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Toggle, { DispatchProps, StateProps } from './Toggle';

const { jQuery: $ } = GLOBAL;

const mapState = (state: State) => ({
    showDock: state.ui.showDock,
    wrapperId: state.ui.wrapperId,
});

const mapDispatchToProps = dispatch => ({
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

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapState, mapDispatchToProps)(Toggle);
