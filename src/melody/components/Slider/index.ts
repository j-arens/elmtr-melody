import DragHelper from '@components/DragHelper/';
import EditorChangeListener from '@components/EditorChangeListener/';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { compose } from 'redux';
import Slider, { OwnProps, StateProps } from './Slider';

let defExport;

const mapState = (state: State) => ({
    wrapperId: state.ui.wrapperId,
});

if (process.env.NODE_ENV === 'test') {
    defExport = DragHelper(Slider);
} else {
    defExport = compose(
        connect<StateProps, {}, OwnProps>(mapState),
        EditorChangeListener,
        DragHelper,
    )(Slider);
}

export default defExport;
