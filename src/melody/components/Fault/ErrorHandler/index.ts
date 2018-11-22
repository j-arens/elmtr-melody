import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import ErrorHandler, { DispatchProps, OwnProps } from './ErrorHandler';

const stateThunk = () => (_, getState: () => State) => getState();

const mapDispatch = dispatch => bindActionCreators({
    getState: stateThunk,
}, dispatch);

export default connect<
    {},
    DispatchProps,
    OwnProps
>(null, mapDispatch)(ErrorHandler);
