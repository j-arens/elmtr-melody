import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import Portal from '@components/Portal/Portal';
import { WithOptionalClassName } from '@melody/components/type';
import { DockToggleDims } from '@melody/redux/modules/ui/type';
import { Action, Track } from '@redux/type';
import { NO_OP } from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
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

interface State {
    width: number;
}

type Props = StateProps & DispatchProps & WithOptionalClassName;

export default class extends Component<Props, State> {
    static defaultProps = {
        className: '',
    };

    state = {
        width: null,
    };

    el: HTMLElement;

    componentDidMount() {
        if (this.el) {
            this.setState({
                width: this.el.offsetWidth,
            });
        }
    }

    handleDownload = () => {
        const { track: { download_url, attributes: { origin } } } = this.props;
        if (origin === 'internal') {
            window.location.href = download_url;
        } else {
            window.open(download_url);
        }
    }

    portalDock(inner) {
        return (
            <Portal into="body">
                {inner}
            </Portal>
        );
    }

    render(props: Props, { width }: State) {
        const {
            showDock,
            track,
            speedUp,
            slowDown,
            playbackRate,
            coordinates,
            className,
        } = props;

        const speedUpClasses = classnames(s.dock__control, {
            [s['dock__control--disabled']]: playbackRate === 2,
        });

        const slowDownClasses = classnames(s.dock__control, {
            [s['dock__control--disabled']]: playbackRate === 0.5,
        });

        const { controls, arrow } = dockPosition(coordinates, width);

        const dockControls = (
            <div
                ref={el => this.el = el as HTMLElement}
                class={`${s.dock} ${className}`}
                style={{
                    pointerEvents: showDock ? 'all' : 'none',
                    visibility: showDock ? 'visible' : 'hidden',
                    ...controls,
                }}
            >
                <span class={s.dock__arrow} style={arrow} />
                <div class={s.dock__controlsGroup}>
                    {track.download_url &&
                        <BaseButton
                            onClick={this.handleDownload}
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
        );

        if (process.env.NODE_ENV !== 'test') {
            return this.portalDock(dockControls);
        }

        return dockControls;
    }
}
