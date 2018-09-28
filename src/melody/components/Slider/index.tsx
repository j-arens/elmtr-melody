import { Component, h } from 'preact';
import { WithOptionalClassName } from '@components/type';
import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';
import { GLOBAL } from '@melody/constants';
import { getHandlePlacement } from './helpers';
import { SliderColors, SliderBodyClickEvent, SliderDragEventHandler } from './type';
import DragHelper from '@components/DragHelper/';
import { ELEMENTOR_NO_DRAG } from '@constants';
const s = require('./style.scss');
const throttle = require('lodash.throttle');

// return (
//     <Slider
//         className={string}
//         height={string}
//         handleSize={string | number}
//         offset={number}
//         eventRadius={8}
//         onHandleClick={fn}
//         onBodyClick={fn}
//         onBeginDrag={fn}
//         onDragging={fn}
//         onEndDrag={fn}
//         colors={}
//     />
// );



interface Props extends WithOptionalClassName, DragProps {
    height: number;
    handleSize: number;
    offset: number;
    throttle: number;
    colors?: SliderColors;
    eventRadius?: number;
    onHandleClick?: (e: MouseEvent) => any;
    onBodyClick?: (data: SliderBodyClickEvent) => any;
    onBeginDrag?: SliderDragEventHandler
    onEndDrag?: SliderDragEventHandler
    onDragging?: SliderDragEventHandler
}

interface State {
    width: number;
    left: number;
}

class Slider extends Component<Props, State> {
    state = {
        width: 0,
        left: 0,
    }

    defaultColors = {
        bg: '#333',
        backfill: '#a5a5a5',
        handle: '#fff',
    }

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

    getNextOffset(x: number): number {
        if (!this.slider) {
            return 0;
        }
        const { left, width } = this.state;
        return ((x - left) / width) * 100;
    }

    handleDragEvent = throttle((
        event: MelodyDragEvent,
        handler?: SliderDragEventHandler | undefined,
    ) => {
        if (!this.slider || typeof handler !== 'function') {
            return;
        }
        const { clientX } = event;
        const nextOffset = this.getNextOffset(clientX);
        handler({
            event,
            offset: nextOffset,
        });
    }, this.props.throttle = 0);

    onMouseDown = (event: MouseEvent) => {
        const { onBodyClick } = this.props;
        if (!this.slider || typeof onBodyClick !== 'function') {
            return;
        }
        const { pageX } = event;
        const { offset, handleSize } = this.props;
        const nextOffset = this.getNextOffset(pageX);
        const overlap = (handleSize / this.state.width) * 100
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
            colors,
            height,
        } = props;
        const color = {
            ...this.defaultColors,
            ...colors,
        };
        return (
            <div
                class={`${s.slider} ${ELEMENTOR_NO_DRAG}`}
                ref={this.setRef}
                onMouseDown={this.onMouseDown}
                style={{
                    padding: eventRadius ? `${eventRadius}px 0` : 0, 
                }}
            >
                <div
                    class={s.slider__body}
                    style={{
                        height: `${height}px`,
                        backgroundColor: color.bg,
                    }}
                >
                    <div
                        class={s.slider__backfill}
                        style={{
                            transform: `translate3d(${offset}%, 0, 0)`,
                            backgroundColor: color.backfill,
                        }}
                    />
                </div>
                {width &&
                    <div
                        class={s.slider__handle}
                        onMouseDown={onHandleClick}
                        style={{
                            ...getHandlePlacement(width, handleSize, offset),
                            width: `${handleSize}px`,
                            height: `${handleSize}px`,
                            backgroundColor: color.handle,
                        }}
                    />
                }
            </div>
        );
    }
}

export default DragHelper(Slider);
