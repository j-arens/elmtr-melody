import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@components/type';
import { toggleRepeat } from '@redux/actions';
import { Action, State } from '@redux/type';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

const mapStateToProps = (state: State) => ({
    repeat: state.repeat,
});

const mapDispatchToProps = dispatch => ({
    toggleRepeat: () => dispatch(toggleRepeat()),
});

interface Props extends WithOptionalClassName {
    repeat: boolean;
    toggleRepeat: () => Action;
}

const RepeatButton = ({ repeat, toggleRepeat, className = '' }: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl melody-repeat`;
    const activeClass = `${defaultClass} ${s['playbackCtrl--active']} melody-c-repeat-on`;
    return (
        <BaseButton
            key="repeat"
            className={repeat ? activeClass : defaultClass}
            onClick={toggleRepeat}
        >
            <Icon className={s.playbackCtrl__icon} name="repeat" />
        </BaseButton>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RepeatButton);
