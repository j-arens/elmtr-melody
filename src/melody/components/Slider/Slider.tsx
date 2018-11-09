import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';
import { ELEMENTOR_NO_DRAG } from '@constants';
import { GLOBAL } from '@melody/constants';
import { cySelector } from '@utils/index';
import * as throttle from 'lodash.throttle';
import { Component, h } from 'preact';
import { getHandlePlacement, getNextOffset } from './helpers';
import {
    SliderBodyClickEvent,
    SliderClasses,
    SliderDragEventHandler,
    SliderOrientation,
} from './type';
const s = require('./style.scss');

export interface StateProps {
    wrapperId: string;
}

interface HOCProps extends DragProps {
    onEditorChange: (cb: () => any) => void;
}

export interface OwnProps extends HOCProps {
    orientation?: SliderOrientation;
    bodySize: number;
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
    area: number;
    base: number;
}

type Props = StateProps & OwnProps;

const defaultClasses = {
    slider: '',
    body: '',
    backfill: '',
    handle: '',
};

export default class extends Component<Props, State> {
    state = {
        area: 0,
        base: 0,
    };

    componentDidMount() {
        const { onEditorChange } = this.props;
        this.setDimensions();
        this.bindDragHandlers();
        onEditorChange(this.setDimensions);
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
            const { orientation } = this.props;
            const rect = this.slider.getBoundingClientRect();
            this.setState({
                area: orientation === 'vertical' ? rect.height : rect.width,
                base: orientation === 'vertical' ? rect.bottom : rect.left,
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
        const { orientation } = this.props;
        const { base, area } = this.state;
        const { clientX, clientY } = event;
        const delta = orientation === 'vertical' ? clientY : clientX;
        const nextOffset = getNextOffset(delta, base, area, orientation);
        handler({
            event,
            offset: nextOffset,
        });
    }, this.props.throttle = 0);

    onMouseDown = (event: MouseEvent) => {
        const { onBodyClick, orientation, offset, handleSize } = this.props;
        if (!this.slider || typeof onBodyClick !== 'function') {
            return;
        }
        const { base, area } = this.state;
        const { pageX, pageY } = event;
        const delta = orientation === 'vertical' ? pageY : pageX;
        const nextOffset = getNextOffset(delta, base, area, orientation);
        const overlap = (handleSize / this.state.area) * 100;
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

    render(props: Props, { area }: State) {
        const {
            offset,
            handleSize,
            eventRadius,
            onHandleClick,
            bodySize,
            classes,
        } = props;
        const userClasses = Object.assign(defaultClasses, classes);
        return (
            <div
                class={`${s.slider} ${ELEMENTOR_NO_DRAG} ${userClasses.slider}`}
                ref={this.setRef}
                onMouseDown={this.onMouseDown}
                style={{ padding: eventRadius ? `${eventRadius}px 0` : 0 }}
            >
                <div
                    class={`${s.slider__body} ${userClasses.body}`}
                    style={{ height: `${bodySize}px` }}
                    {...cySelector('slider-body')}
                >
                    <div
                        class={`${s.slider__backfill} ${userClasses.backfill}`}
                        style={{ transform: `translate3d(${offset}%, 0, 0)` }}
                        {...cySelector('slider-backfill')}
                    />
                </div>
                {area ?
                    <div
                        class={`${s.slider__handle} ${userClasses.handle}`}
                        onMouseDown={onHandleClick}
                        {...cySelector('slider-handle')}
                        style={{
                            ...getHandlePlacement(area, handleSize, offset),
                            width: `${handleSize}px`,
                            height: `${handleSize}px`,
                        }}
                    />
                    :
                    null
                }
            </div>
        );
    }
}
