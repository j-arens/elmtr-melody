import { toggleDock } from '@redux/modules/ui/actions';
import { connect } from 'preact-redux';
import Toggle, { DispatchProps, OwnProps } from './Toggle';

const mapDispatchToProps = dispatch => ({
    toggleDock: ({ target }: Event) => {
        const { width, bottom, right } = (target as HTMLElement).getBoundingClientRect();
        return dispatch(toggleDock({
            width,
            x: right,
            y: bottom,
        }));
    },
});

export default connect<
    {},
    DispatchProps,
    OwnProps
>(null, mapDispatchToProps)(Toggle);
