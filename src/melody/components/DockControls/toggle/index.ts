import { toggleDock } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Toggle, { DispatchProps, StateProps } from './Toggle';

const mapState = (state: State) => ({
    showDock: state.ui.showDock,
});

const mapDispatchToProps = dispatch => ({
    toggleDock: ({ target }: Event) => {
        const wrapperRect = document.getElementById('elementor').getBoundingClientRect();
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
