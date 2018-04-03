import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { prevTrack } from '@redux/actions';
import { Action, State } from '@redux/type';
import { NO_OP } from '@utils/index';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

const mapStateToProps = (state: State) => ({
    totalTracks: state.tracks.length,
});

const mapDispatchToProps = dispatch => ({
    prevTrack: () => dispatch(prevTrack()),
});

interface Props {
    totalTracks: number;
    prevTrack: () => Action;
}

const PrevButton = ({ totalTracks, prevTrack }: Props) => {
    const defaultClass = `${s.playbackCtrl} melody-playbackCtrl`;
    const disabledClass = `${defaultClass} ${s['playbackCtrl--disabled']}`;
    return (
        <BaseButton
            key="prev"
            className={totalTracks > 1 ? defaultClass : disabledClass}
            onClick={totalTracks > 1 ? prevTrack : NO_OP}
        >
            <Icon className={s.playbackCtrl__icon} name="prev" />
        </BaseButton>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PrevButton);
