import DragHelper from '@components/DragHelper/';
import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';
import { ELEMENTOR_NO_DRAG } from '@constants';
import { GLOBAL } from '@melody/constants';
import { Component, h } from 'preact';
import { getHandlePlacement, getNextOffset } from './helpers';
import {
    SliderBodyClickEvent,
    SliderClasses,
    SliderDragEventHandler,
} from './type';
const s = require('./style.scss');
const throttle = require('lodash.throttle');

interface Props extends DragProps {
    height: number;
    handleSize: number;
    offset: number;
    throttle?: number;
    eventRadius?: number;
    onHandleClick?: (e: MouseEvent) => any;
    onBodyClick?: (data: SliderBodyClickEvent) => any;
    onBeginDrag?: SliderDragEventHandler;
    onEndDrag?: SliderDragEventHandler;
    onDragging?: SliderDragEventHandler;
    classes?: SliderClasses;
}

interface State {
    width: number;
    left: number;
}

class Slider extends Component<Props, State> {
    static defaultProps = {
        throttle: 0,
        classes: {
            slider: '',
            body: '',
            backfill: '',
            handle: '',
        },
    };

    state = {
        width: 0,
        left: 0,
    };

    componentDidMount() {
        this.setDimensions();
        this.bindDragHandlers();
        GLOBAL.addEventListener('resize', this.setDimensions);
    }

    componentWillUnmount() {
        GLOBAL.removeEventListener('resize', this.setDimensions);
    }

    bindDragHandlers() {
        const {
            onDragStart,
            onBeginDrag,
            onDrag,
            onDragging,
            onDragEnd,
            onEndDrag,
        } = this.props;
        onDragStart((e: MelodyDragEvent) => this.handleDragEvent(e, onBeginDrag));
        onDrag((e: MelodyDragEvent) => this.handleDragEvent(e, onDragging));
        onDragEnd((e: MelodyDragEvent) => this.handleDragEvent(e, onEndDrag));
    }

    setDimensions = throttle(() => {
        if (this.slider) {
            const rect = this.slider.getBoundingClientRect();
            this.setState({
                width: rect.width,
                left: rect.left,
            });
        }
    }, 1000);

    setRef = (el?: HTMLElement) => {
        const { setDragRef } = this.props;
        if (el) {
            this.slider = el;
            setDragRef(el);
        }
    }

    handleDragEvent = throttle((
        event: MelodyDragEvent,
        handler?: SliderDragEventHandler | undefined,
    ) => {
        if (!this.slider || typeof handler !== 'function') {
            return;
        }
        const { clientX } = event;
        const nextOffset = getNextOffset(clientX, this.state);
        handler({
            event,
            offset: nextOffset,
        });
    }, this.props.throttle);

    onMouseDown = (event: MouseEvent) => {
        const { onBodyClick } = this.props;
        if (!this.slider || typeof onBodyClick !== 'function') {
            return;
        }
        const { pageX } = event;
        const { offset, handleSize } = this.props;
        const nextOffset = getNextOffset(pageX, this.state);
        const overlap = (handleSize / this.state.width) * 100;
        const upperRange = offset + overlap;
        const lowerRange = offset - overlap;
        const insideHandle = (nextOffset >= lowerRange) && (nextOffset <= upperRange);
        onBodyClick({
            event,
            offset: nextOffset,
            insideHandle,
        });
    }

    slider: HTMLElement;

    render(props: Props, { width }: State) {
        const {
            offset,
            handleSize,
            eventRadius,
            onHandleClick,
            height,
            classes,
        } = props;
        return (
            <div
                class={`${s.slider} ${ELEMENTOR_NO_DRAG} ${classes.slider}`}
                ref={this.setRef}
                onMouseDown={this.onMouseDown}
                style={{ padding: eventRadius ? `${eventRadius}px 0` : 0 }}
            >
                <div
                    class={`${s.slider__body} ${classes.body}`}
                    style={{ height: `${height}px` }}
                >
                    <div
                        class={`${s.slider__backfill} ${classes.backfill}`}
                        style={{ transform: `translate3d(${offset}%, 0, 0)` }}
                    />
                </div>
                {width &&
                    <div
                        class={`${s.slider__handle} ${classes.handle}`}
                        onMouseDown={onHandleClick}
                        style={{
                            ...getHandlePlacement(width, handleSize, offset),
                            width: `${handleSize}px`,
                            height: `${handleSize}px`,
                        }}
                    />
                }
            </div>
        );
    }
}

export default DragHelper(Slider);
