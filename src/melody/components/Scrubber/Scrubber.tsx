import Slider from '@components/Slider/';
import { SliderBodyClickEvent, SliderDragEvent } from '@components/Slider/type';
import { Action } from '@redux/type';
import { MachineStates } from '@state-machine/type';
import { cySelector, NO_OP } from '@utils/index';
import { Component, h } from 'preact';
import * as classes from './classes';
import { getNewTime } from './helpers';

export interface StateProps {
    currentState: MachineStates;
    duration: number;
    currentTime: number;
}

export interface DispatchProps {
    updateCurrentTime: (updatedTime: number) => Action;
    toggleComponentDragging: (component: string, isDragging: boolean) => Action;
    triggerTimeSync: () => Action;
}

interface State {
    offset: number;
    dragging: boolean;
}

type Props = StateProps & DispatchProps;

export default class extends Component<Props, State> {
    state = {
        offset: 0,
        dragging: false,
    };

    componentDidUpdate(prevProps: Props, prevState: State) {
        const timeChanged = this.props.currentTime !== prevProps.currentTime;
        if (timeChanged) {
            const { duration, currentTime } = this.props;
            if (duration) {
                const nextOffset = 100 / (duration / currentTime);
                this.setState({ offset: nextOffset });
            } else {
                this.setState({ offset: 0 });
            }
        }

        const { dragging } = this.state;
        if (prevState.dragging !== dragging) {
            const { toggleComponentDragging } = this.props;
            toggleComponentDragging('scrubber', dragging);
        }
    }

    eventGuard = fn => (...args) => {
        if (!this.props.duration) {
            return NO_OP;
        }
        return fn(...args);
    }

    handleClick = this.eventGuard(({ insideHandle, offset }: SliderBodyClickEvent) => {
        if (insideHandle) {
            return;
        }
        const { updateCurrentTime, triggerTimeSync, duration } = this.props;
        updateCurrentTime(getNewTime(offset, duration));
        triggerTimeSync();
    });

    handleDragging = this.eventGuard(({ offset }: SliderDragEvent) => {
        const { updateCurrentTime, duration } = this.props;
        this.setState({ dragging: true });
        updateCurrentTime(getNewTime(offset, duration));
    });

    handleDragEnd = this.eventGuard(({ offset }: SliderDragEvent) => {
        const { updateCurrentTime, triggerTimeSync, duration } = this.props;
        this.setState({ dragging: false });
        updateCurrentTime(getNewTime(offset, duration));
        triggerTimeSync();
    });

    render(_, { offset }: State) {
        return (
            <Slider
                height={5}
                handleSize={14}
                eventRadius={8}
                throttle={10}
                offset={offset}
                onBodyClick={this.handleClick}
                onDragging={this.handleDragging}
                onEndDrag={this.handleDragEnd}
                classes={{
                    body: classes.body,
                    backfill: classes.backfill,
                    handle: classes.handle,
                }}
            />
        );
    }
}
