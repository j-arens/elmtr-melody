import { State } from '@redux/type';
import { connect } from 'preact-redux';
import Slider, { OwnProps, StateProps } from './Slider';

const mapState = (state: State) => ({
    wrapperId: state.ui.wrapperId,
});

let exportComponent = connect<StateProps, {}, OwnProps>(mapState)(Slider);

if (process.env.NODE_ENV === 'test') {
    exportComponent = Slider;
}

export default exportComponent;
