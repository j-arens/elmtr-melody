import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { Action, Track } from '@redux/type';
import * as classnames from 'classnames';
import { h } from 'preact';
import { NO_OP } from '@utils/index';
const s = require('./style.scss');

interface Props {
    showDock: boolean;
    track: Track;
    playbackRate: number;
    toggleDock: () => Action;
    speedUp: () => Action;
    slowDown: () => Action;
}

export default ({
    showDock,
    toggleDock,
    track,
    speedUp,
    slowDown,
    playbackRate,
}: Props) => {
    const handleDownload = () => {
        const { download_url, attributes: { origin } } = track;
        if (origin === 'internal') {
            window.location.href = download_url;
        } else {
            window.open(download_url);
        }
    };
    const speedUpClasses = classnames(s.dock__control, {
        [s['dock__control--disabled']]: playbackRate === 2,
    });
    const slowDownClasses = classnames(s.dock__control, {
        [s['dock__control--disabled']]: playbackRate === 0.5,
    });
    return (
        <div class={s.dock}>
            <BaseButton
                onClick={toggleDock}
                className={s.dock__toggle}
            >
                <Icon className={s.dock__toggleIcon} name="settings" />
            </BaseButton>
            {showDock && [
                <span key="arrow" class={s.dock__arrow} />,
                <div key="group" class={s.dock__controlsGroup}>
                    {track.download_url &&
                        <BaseButton
                            onClick={handleDownload}
                            className={s.dock__control}
                        >
                            <Icon className={s.dock__controlIcon} name="download" />
                            <span class={s.dock__controlName}>Download</span>
                        </BaseButton>
                    }
                    <BaseButton
                        onClick={playbackRate === 2 ? NO_OP : speedUp}
                        className={speedUpClasses}
                    >
                        <Icon className={s.dock__controlIcon} name="plus" />
                        <span class={s.dock__controlName}>Speed up</span>
                    </BaseButton>
                    <BaseButton
                        onClick={playbackRate === 0.5 ? NO_OP : slowDown}
                        className={slowDownClasses}
                    >
                        <Icon className={s.dock__controlIcon} name="minus" />
                        <span class={s.dock__controlName}>Slow down</span>
                    </BaseButton>
                </div>]
            }
        </div>
    );
};
