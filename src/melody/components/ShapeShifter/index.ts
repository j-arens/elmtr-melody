import { State } from '@redux/type';
import { connect } from 'preact-redux';
import ShapeShifter, { StateProps } from './ShapeShifter';

const mapState = (state: State) => ({
    view: state.ui.view,
});

export default connect<
    StateProps,
    {},
    {}
>(mapState)(ShapeShifter);
