import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import Portal from '@components/Portal/Portal';
import { WithOptionalClassName } from '@melody/components/type';
import { DockToggleDims } from '@melody/redux/modules/ui/type';
import { Action, Track } from '@redux/type';
import { NO_OP, prefixClasses } from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
import { dockPosition } from './helpers';
const s = require('../style.scss');

export interface StateProps {
    showDock: boolean;
    track: Track;
    playbackRate: number;
    coordinates: DockToggleDims;
    wrapperId: string;
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
        customizationClasses: '',
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
            <Portal into="#elementor">
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
            wrapperId,
        } = props;

        const baseBtnClasses = classnames(
            s.dock__control,
            prefixClasses(
                `elementor-element-${wrapperId}-`,
                'dock-controls-secondary-color dock-controls-text-color dock-controls-font',
            ),
        );

        const speedUpClasses = classnames(baseBtnClasses, {
            [s['dock__control--disabled']]: playbackRate === 2,
        });

        const slowDownClasses = classnames(baseBtnClasses, {
            [s['dock__control--disabled']]: playbackRate === 0.5,
        });

        const { controls, arrow } = dockPosition(coordinates, width);

        const dockControls = (
            <div
                ref={el => this.el = el as HTMLElement}
                class={classnames(
                    s.dock,
                    className,
                    prefixClasses(
                        `elementor-element-${wrapperId}-`,
                        'dock-controls-primary-color',
                    ),
                )}
                style={{
                    pointerEvents: showDock ? 'all' : 'none',
                    visibility: showDock ? 'visible' : 'hidden',
                    ...controls,
                }}
            >
                <span
                    class={classnames(
                        s.dock__arrow,
                        prefixClasses(
                            `elementor-element-${wrapperId}-`,
                            'dock-controls-arrow-color dock-controls-border-color',
                        ),
                    )}
                    style={arrow}
                />
                <div
                    class={classnames(
                        s.dock__controlsGroup,
                        prefixClasses(
                            `elementor-element-${wrapperId}-`,
                            'dock-controls-border-color',
                        ),
                    )}
                >
                    {track.download_url &&
                        <BaseButton
                            onClick={this.handleDownload}
                            className={baseBtnClasses}
                        >
                            <Icon
                                className={classnames(
                                    s.dock__controlIcon,
                                    prefixClasses(
                                        `elementor-element-${wrapperId}-`,
                                        'dock-controls-icon-color',
                                    ),
                                )}
                                name="download"
                            />
                            <span class={s.dock__controlName}>Download</span>
                        </BaseButton>
                    }
                    <BaseButton
                        onClick={playbackRate === 2 ? NO_OP : speedUp}
                        className={speedUpClasses}
                    >
                        <Icon
                            className={classnames(
                                s.dock__controlIcon,
                                prefixClasses(
                                    `elementor-element-${wrapperId}-`,
                                    'dock-controls-icon-color',
                                ),
                            )}
                            name="plus"
                        />
                        <span class={s.dock__controlName}>Speed up</span>
                    </BaseButton>
                    <BaseButton
                        onClick={playbackRate === 0.5 ? NO_OP : slowDown}
                        className={slowDownClasses}
                    >
                        <Icon
                            className={classnames(
                                s.dock__controlIcon,
                                prefixClasses(
                                    `elementor-element-${wrapperId}-`,
                                    'dock-controls-icon-color',
                                ),
                            )}
                            name="minus"
                        />
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
