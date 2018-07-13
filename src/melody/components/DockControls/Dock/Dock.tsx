import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import Portal from '@components/Portal/Portal';
import { WithOptionalClassName } from '@melody/components/type';
import { DockToggleDims } from '@melody/redux/modules/ui/type';
import { Action, Track } from '@redux/type';
import { NO_OP } from '@utils/index';
import * as classnames from 'classnames';
import { h } from 'preact';
import { dockPosition } from './helpers';
const s = require('../style.scss');

export interface StateProps {
    showDock: boolean;
    track: Track;
    playbackRate: number;
    coordinates: DockToggleDims;
}

export interface DispatchProps {
    speedUp: () => Action;
    slowDown: () => Action;
}

export interface OwnProps extends WithOptionalClassName {
    className?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export default ({
    showDock,
    track,
    speedUp,
    slowDown,
    playbackRate,
    coordinates,
    className = '',
}: Props) => {
    if (!showDock) {
        return null;
    }
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
        <Portal into="body">
            <div class={`${s.dock} ${className}`} style={{ ...dockPosition(coordinates) }}>
                <span key="arrow" class={s.dock__arrow} />
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
                </div>
            </div>
        </Portal>
    );
};
