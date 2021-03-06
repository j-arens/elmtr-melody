import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';
import FullVolMarkup from '@components/Icon/svg/fullVol';
import MediumVolMarkup from '@components/Icon/svg/mediumVol';
import MutedMarkup from '@components/Icon/svg/muted';
import { ELEMENTOR_NO_DRAG } from '@constants';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { cySelector } from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
const s = require('./style.scss');

type VolDragDirection =
    | 'up'
    | 'down';

export interface StateProps {
    volume: number;
}

export interface DispatchProps {
    toggleComponentDragging: (component: string, isDragging: boolean) => Action;
    updateVolume: (newVol: number) => Action;
}

type Props =
    StateProps &
    DispatchProps &
    DragProps &
    WithOptionalClassName;

interface State {
    originalClientY: number;
    lastClientY: number;
    lastDirection: VolDragDirection;
}

const RANGE_SENSITIVITY = 3000;
const CIRCLE_LENGTH = 75;

export default class extends Component<Props, State> {
    state = {
        originalClientY: 0,
        lastClientY: 0,
        lastDirection: null,
    };

    componentDidMount() {
        const { onDragStart, onDrag, onDragEnd } = this.props;

        onDragStart(this.dragStart);
        onDrag(this.setVolume);
        onDragEnd(this.dragEnd);
    }

    dragStart = ({ clientY }: MelodyDragEvent) => {
        const { toggleComponentDragging } = this.props;
        toggleComponentDragging('volume', true);
        this.setState({ originalClientY: clientY });
    }

    dragEnd = () => {
        const { toggleComponentDragging } = this.props;
        toggleComponentDragging('volume', false);
    }

    setVolume = ({ clientY }: MelodyDragEvent) => {
        const { lastClientY, lastDirection } = this.state;
        let { originalClientY } = this.state;

        if (clientY === lastClientY) {
            return;
        }

        this.setState({ lastClientY: clientY });
        const direction: VolDragDirection = lastClientY > clientY ? 'up' : 'down';

        if (direction !== null && direction !== lastDirection) {
            originalClientY = clientY;
            this.setState({
                lastDirection: direction,
                originalClientY: clientY,
            });
        }

        const { volume, updateVolume } = this.props;
        const delta = originalClientY - clientY;
        const percentChange = (delta / RANGE_SENSITIVITY);
        let newLevel = percentChange + volume;

        if (newLevel < 0) {
            newLevel = 0;
            this.setState({ originalClientY: clientY });
        }

        if (newLevel > 1) {
            newLevel = 1;
            this.setState({ originalClientY: clientY });
        }

        updateVolume(newLevel);
    }

    getDashOffset(): object {
        const { volume } = this.props;
        const offset = CIRCLE_LENGTH - (volume * CIRCLE_LENGTH);

        return {
            strokeDashoffset: `${offset}`,
        };
    }

    getIcon(): JSX.Element {
        const { volume } = this.props;

        if (volume <= 0.1) {
            return MutedMarkup;
        }

        if (volume > 0.1 && volume < 0.8) {
            return MediumVolMarkup;
        }

        if (volume >= 0.8) {
            return FullVolMarkup;
        }
    }

    render({ setDragRef, isDragging, className = '' }) {
        const classes = classnames(
            className,
            s.volumeCtrl,
            { [s['volumeCtrl--isDragging']]: isDragging },
        );
        return (
            <div
                class={classes}
                ref={(ref: HTMLElement) => setDragRef(ref)}
                {...cySelector('vol-ctrl')}
            >
                <svg
                    class={`${s.volumeCtrl__icon} ${ELEMENTOR_NO_DRAG}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <circle class={s.volumeCtrl__levelOutline} cx="12" cy="12" r="12"/>
                    <circle class={s.volumeCtrl__level} style={this.getDashOffset()} cx="12" cy="12" r="12"/>
                    {this.getIcon()}
                </svg>
            </div>
        );
    }
}
