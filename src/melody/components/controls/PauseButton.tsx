import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { cycleState } from '@redux/actions';
import { Action } from '@redux/type';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

interface Props extends WithOptionalClassName {
    pause: () => Action;
}

const PauseButton = ({ className = '', pause }: Props) => (
    <BaseButton
        key="pause_track"
        className={`${className} melody-controlBar__catalyst`}
        onClick={pause}
    >
        <Icon
            className={s.playbackCtrl__icon}
            name="pause"
        />
    </BaseButton>
);

const mapDispatchToProps = dispatch => ({
    pause: () => dispatch(cycleState('STOP')),
});

export default connect(null, mapDispatchToProps)(PauseButton);
