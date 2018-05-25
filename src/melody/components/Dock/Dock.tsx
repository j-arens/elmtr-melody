import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action, Track } from '@redux/type';
import { NO_OP } from '@utils/index';
import { __ } from '@wordpress/i18n';
import * as classnames from 'classnames';
import { h } from 'preact';
const s = require('./style.scss');

export interface StateProps {
    showDock: boolean;
    track: Track;
    playbackRate: number;
}

export interface DispatchProps {
    toggleDock: () => Action;
    speedUp: () => Action;
    slowDown: () => Action;
}

export interface OwnProps extends WithOptionalClassName {
    triggerClassName?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export default ({
    showDock,
    toggleDock,
    track,
    speedUp,
    slowDown,
    playbackRate,
    className = '',
    triggerClassName = '',
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
        <div class={`${s.dock} ${className}`}>
            <BaseButton
                onClick={toggleDock}
                className={`${s.dock__toggle} ${triggerClassName}`}
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
                            <span class={s.dock__controlName}>{__('Download')}</span>
                        </BaseButton>
                    }
                    <BaseButton
                        onClick={playbackRate === 2 ? NO_OP : speedUp}
                        className={speedUpClasses}
                    >
                        <Icon className={s.dock__controlIcon} name="plus" />
                        <span class={s.dock__controlName}>{__('Speed up')}</span>
                    </BaseButton>
                    <BaseButton
                        onClick={playbackRate === 0.5 ? NO_OP : slowDown}
                        className={slowDownClasses}
                    >
                        <Icon className={s.dock__controlIcon} name="minus" />
                        <span class={s.dock__controlName}>{__('Slow down')}</span>
                    </BaseButton>
                </div>]
            }
        </div>
    );
};
