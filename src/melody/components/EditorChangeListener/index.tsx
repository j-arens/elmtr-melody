import { State } from '@redux/type';
import { isEditMode, NO_OP } from '@utils/index';
import {
    AnyComponent,
    ComponentConstructor,
    FunctionalComponent,
    h,
} from 'preact';
import { connect } from 'preact-redux';
import { compose } from 'redux';
import EditorChangeListener, { StateProps } from './EditorChangeListener';

let defExport: (Component: AnyComponent<any, any>) =>
    | FunctionalComponent<any>
    | ComponentConstructor<any, any>;

const mapState = (state: State) => ({
    wrapperId: state.ui.wrapperId,
});

if (!isEditMode() || process.env.NODE_ENV === 'test') {
    defExport = Component => props => (
        <Component
            {...props}
            onEditorChange={NO_OP}
        />
    );
} else {
    defExport = Component => compose(
        EditorChangeListener,
        connect<StateProps, {}, {}>(mapState),
    )(Component);
}

export default defExport;
