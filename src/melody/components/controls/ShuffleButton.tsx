import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
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

interface Props {
    shuffle: boolean;
    toggleShuffle: () => Action;
}

const ShuffleButton = ({ shuffle, toggleShuffle }: Props) => {
    const defaultClass = `${s.playbackCtrl} melody-playbackCtrl`;
    const activeClass = `${defaultClass} ${s['playbackCtrl--active']}`;
    return (
        <BaseButton
            key="shuffle"
            className={shuffle ? activeClass : defaultClass}
            onClick={toggleShuffle}
            data-melody-repeat-control={shuffle}
        >
            <Icon className={s.playbackCtrl__icon} name="shuffle" />
        </BaseButton>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShuffleButton);
