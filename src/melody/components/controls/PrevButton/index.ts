import { WithOptionalClassName } from '@components/type';
import { prevTrack } from '@redux/modules/audio/actions';
import { State } from '@redux/type';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import PrevButton, { DispatchProps } from './PrevButton';

const mapDispatch = dispatch => bindActionCreators({
    prevTrack,
}, dispatch);

export default connect<
    {},
    DispatchProps,
    WithOptionalClassName
>(null, mapDispatch)(PrevButton);
