import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import Portal from '@components/Portal/Portal';
import { WithOptionalClassName } from '@melody/components/type';
import { GLOBAL } from '@melody/constants';
import { DockToggleDims } from '@melody/redux/modules/ui/type';
import { Action, Track } from '@redux/type';
import { cySelector, NO_OP } from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
import * as classes from './classes';
import { dockPosition } from './helpers';
const s = require('../style.scss');

const { jQuery: $ } = GLOBAL;

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
        const { track: { download_url } } = this.props;
        window.open(download_url, '_blank');
    }

    portalDock(inner) {
        const { wrapperId } = this.props;
        const el = document.getElementById(`melody-widgetRoot:${wrapperId}`);
        const node = $(el).closest('.elementor-section').get(0);
        return (
            <Portal into={node}>
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
            'elementor-element',
            classes.baseBtns(wrapperId),
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
                    'elementor-element',
                    className,
                    classes.dockControls(wrapperId),
                )}
                style={{
                    pointerEvents: showDock ? 'all' : 'none',
                    visibility: showDock ? 'visible' : 'hidden',
                    ...controls,
                }}
                {...cySelector('dock-controls')}
            >
                <span
                    class={classnames(
                        s.dock__arrow,
                        'elementor-element',
                        classes.dockArrow(wrapperId),
                    )}
                    style={arrow}
                />
                <div
                    class={classnames(
                        s.dock__controlsGroup,
                        'elementor-element',
                        classes.controlsGroup(wrapperId),
                    )}
                    {...cySelector('dock-controls-wrap')}
                >
                    {track.download_url &&
                        <BaseButton
                            onClick={this.handleDownload}
                            className={baseBtnClasses}
                            {...cySelector('download')}
                        >
                            <Icon
                                className={classnames(
                                    s.dock__controlIcon,
                                    'elementor-element',
                                    classes.controlIcon(wrapperId),
                                )}
                                name="download"
                            />
                            <span class={s.dock__controlName}>Download</span>
                        </BaseButton>
                    }
                    <BaseButton
                        onClick={playbackRate === 2 ? NO_OP : speedUp}
                        className={speedUpClasses}
                        {...cySelector('speed-up')}
                    >
                        <Icon
                            className={classnames(
                                s.dock__controlIcon,
                                'elementor-element',
                                classes.controlIcon(wrapperId),
                            )}
                            name="plus"
                        />
                        <span class={s.dock__controlName}>Speed up</span>
                    </BaseButton>
                    <BaseButton
                        onClick={playbackRate === 0.5 ? NO_OP : slowDown}
                        className={slowDownClasses}
                        {...cySelector('slow-down')}
                    >
                        <Icon
                            className={classnames(
                                s.dock__controlIcon,
                                'elementor-element',
                                classes.controlIcon(wrapperId),
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
