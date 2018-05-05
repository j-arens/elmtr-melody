import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@components/type';
import { toggleShuffle } from '@redux/actions';
import { Action, State } from '@redux/type';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

const mapStateToProps = (state: State) => ({
    shuffle: state.shuffle,
});

const mapDispatchToProps = dispatch => ({
    toggleShuffle: () => dispatch(toggleShuffle()),
});

interface Props extends WithOptionalClassName {
    shuffle: boolean;
    toggleShuffle: () => Action;
}

const ShuffleButton = ({ shuffle, toggleShuffle, className = '' }: Props) => {
    const defaultClass = `${className} ${s.playbackCtrl} melody-playbackCtrl melody-shuffle`;
    const activeClass = `${defaultClass} ${s['playbackCtrl--active']} melody-c-shuffle-on`;
    return (
        <BaseButton
            key="shuffle"
            className={shuffle ? activeClass : defaultClass}
            onClick={toggleShuffle}
        >
            <Icon className={s.playbackCtrl__icon} name="shuffle" />
        </BaseButton>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShuffleButton);
