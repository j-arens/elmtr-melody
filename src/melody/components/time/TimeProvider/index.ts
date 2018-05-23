import { connect } from 'preact-redux';
import { compose } from 'redux';
import { State } from '@redux/type';
import TimeProvider from './TimeProvider';

export const unconnected = TimeProvider;

const mapStateToProps = (state: State) => ({
    currentTime: state.currentTime,
    duration: state.filelength,
});

export default compose(connect(mapStateToProps), TimeProvider);

// compose(connect(mapStateToProps), TimeProvider)(TimeElapsed);
// ConnectResult(TimeProvider(TimeElapsed))
// TimeProvider(TimeElapsed) -> is the class that is returned by the HOC
