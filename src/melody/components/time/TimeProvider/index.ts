import { WithOptionalClassName } from '@components/type';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { compose } from 'redux';
import TimeProvider, { StateProps } from './TimeProvider';

const mapState = (state: State) => ({
    currentTime: state.audio.currentTime,
    duration: state.audio.filelength,
});

export default compose(
    connect<StateProps, {}, WithOptionalClassName>(mapState),
    TimeProvider,
);

// compose(connect(mapStateToProps), TimeProvider)(TimeElapsed);
// ConnectResult(TimeProvider(TimeElapsed))
// TimeProvider(TimeElapsed) -> is the class that is returned by the HOC
