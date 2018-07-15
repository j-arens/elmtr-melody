import { toggleDock } from '@redux/modules/ui/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Toggle, { DispatchProps, StateProps } from './Toggle';

const mapState = (state: State) => ({
    showDock: state.ui.showDock,
});

const mapDispatchToProps = dispatch => ({
    toggleDock: ({ target }: Event) => {
        const { width, bottom, left } = (target as HTMLElement).getBoundingClientRect();
        return dispatch(toggleDock({
            width,
            x: left,
            y: bottom,
        }));
    },
});

export default connect<
    StateProps,
    DispatchProps,
    {}
>(mapState, mapDispatchToProps)(Toggle);
