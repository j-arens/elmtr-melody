import { WithOptionalClassName } from '@components/type';
import { prevTrack } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import PrevButton, { DispatchProps } from './PrevButton';

const mapDispatchToProps = dispatch => ({
    prevTrack: () => dispatch(prevTrack()),
});

export default connect<
    {},
    DispatchProps,
    WithOptionalClassName
>(null, mapDispatchToProps)(PrevButton);
