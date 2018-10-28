import { State } from '@redux/type';
import { connect } from 'preact-redux';
import ErrorHandler, { OwnProps, StateProps } from './ErrorHandler';

const mapState = (state: State) => ({ state });

export default connect<
    StateProps,
    {},
    OwnProps
>(mapState)(ErrorHandler);
