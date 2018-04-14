import DragHelper from '@components/DragHelper/';
import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';
import { ELEMENTOR_NO_DRAG } from '@constants';
import { Action } from '@redux/type';
import { MachineStates } from '@state-machine/type';
import { getLayerX } from '@utils/index';
import { NO_OP } from '@utils/index';
import * as classnames from 'classnames';
import { Component, h } from 'preact';
const s = require('./style.scss');

interface Props extends DragProps {
    currentState: MachineStates;
    duration: number;
    currentTime: number;
    updateCurrentTime: (updatedTime: number) => Action;
    toggleGliderDragging: () => Action;
    triggerTimeSync: () => Action;
}

interface State {
    transitionHandle: boolean;
    offset: number;
    clientX: number;
}

const HANDLE_AREA: number = 14;
const HANDLE_SPACING: number = 2;

export default class extends Component<Props, State> {
    state = {
        transitionHandle: false,
        offset: 0,
        clientX: 0,
    };

    ref: HTMLElement;

    componentDidMount() {
        const { onDragStart, onDrag, onDragEnd } = this.props;
        onDragStart(this.onDragStart);
        onDrag(this.onDrag);
        onDragEnd(this.onDragEnd);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.currentTime !== prevProps.currentTime) {
            const { duration, currentTime } = this.props;
            if (duration) {
                const nextOffset: number = Math.round(100 / (duration / currentTime));
                this.updateOffset(nextOffset);
            } else {
                this.updateOffset(0);
            }
        }

        if (this.props.isDragging !== prevProps.isDragging) {
            this.props.toggleGliderDragging();
        }
    }

    setRef = (ref: HTMLElement) => {
        this.ref = ref;
        this.props.setDragRef(ref);
    }

    eventGuard = fn => (...args) => {
        if (!this.props.duration) {
            return NO_OP;
        }
        return fn(...args);
    }

    updateOffset(nextOffset: number) {
        this.setState({ offset: nextOffset });
    }

    onDragStart = this.eventGuard(({ clientX }: MelodyDragEvent) => {
        this.setState({ clientX });
    });

    onDragEnd = this.eventGuard((e: MelodyDragEvent) => {
        this.handleClick(e, false);
    });

    onDrag = this.eventGuard(({ clientX }: MelodyDragEvent) => {
        if (!this.ref) {
            return;
        }

        const originalClientX = this.state.clientX;

        if (clientX === originalClientX) {
            return;
        }

        const { offset } = this.state;
        const { duration, updateCurrentTime } = this.props;
        const width: number = this.ref.offsetWidth;
        const x: number = getLayerX(this.ref, clientX);
        let newOffset: number = Number(((x / width) * 100).toFixed(2));

        if (newOffset > 100) {
            newOffset = 100;
        }

        if (newOffset < 0) {
            newOffset = 0;
        }

        this.updateOffset(newOffset);
        const updatedTime: number = Number(((duration * newOffset) / 100).toFixed(0));
        updateCurrentTime(updatedTime);
    });

    handleClick = this.eventGuard(({ clientX }: MouseEvent, ignoreHandle: boolean = true) => {
        if (!this.ref) {
            return;
        }

        const width: number = this.ref.offsetWidth;
        const x: number = getLayerX(this.ref, clientX);

        if (ignoreHandle) {
            const currentOffset: number = this.state.offset;
            const rightPadding: number = HANDLE_AREA / 2;
            const handleCenter: number = (currentOffset * width) / 100;
            const lowerBoundary: number = handleCenter - (HANDLE_AREA + HANDLE_SPACING) + rightPadding;
            const upperBoundary: number = handleCenter + HANDLE_AREA + HANDLE_SPACING;
            const withinHandle: boolean = x >= lowerBoundary && x <= upperBoundary;

            if (withinHandle) {
                return;
            }
        }

        const { duration, updateCurrentTime, triggerTimeSync } = this.props;
        const xPercent: number = 100 / (width / x);
        const updatedTime: number = Number(((duration * xPercent) / 100).toFixed(0));
        updateCurrentTime(updatedTime);
        triggerTimeSync();
    });

    render({ setDragRef, currentState, isDragging }, { offset }) {
        const defaultClass = s.glider__trackbar;
        const shouldTransition = currentState === 'playing' && offset > 0 && !isDragging;
        const classes = classnames(defaultClass, {
            [`${defaultClass}--transition`]: shouldTransition,
        });
        return (
            <div
                ref={(ref: HTMLElement) => this.setRef(ref)}
                class={`${s.glider} ${ELEMENTOR_NO_DRAG}`}
                onMouseDown={this.handleClick}
            >
                <div class={s.glider__playback}>
                    <div
                        class={classes}
                        style={{marginLeft: `${offset}%`}}
                        data-melody-scrubber-progress
                    >
                        <div class={s.glider__handle} data-melody-scrubber-handle />
                    </div>
                </div>
            </div>
        );
    }
}
