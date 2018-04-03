import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { nextTrack } from '@redux/actions';
import { Action, State } from '@redux/type';
import { NO_OP } from '@utils/index';
import { h } from 'preact';
import { connect } from 'preact-redux';
const s = require('./styles.scss');

const mapStateToProps = (state: State) => ({
    totalTracks: state.tracks.length,
});

const mapDispatchToProps = dispatch => ({
    nextTrack: () => dispatch(nextTrack()),
});

interface Props {
    totalTracks: number;
    nextTrack: () => Action;
}

const NextButton = ({ totalTracks, nextTrack }: Props) => {
    const defaultClass = `${s.playbackCtrl} melody-playbackCtrl`;
    const disabledClass = `${defaultClass} ${s['playbackCtrl--disabled']}`;
    return (
        <BaseButton
            key="next"
            className={totalTracks > 1 ? defaultClass : disabledClass}
            onClick={totalTracks > 1 ? nextTrack : NO_OP}
        >
            <Icon className={s.playbackCtrl__icon} name="next" />
        </BaseButton>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
