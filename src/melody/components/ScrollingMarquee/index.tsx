import { WithOptionalClassName } from '@components/type';
import { NO_OP } from '@utils/index';
import { Component, h } from 'preact';
import {
    calculateDimensions,
    canScroll,
    didResize,
    getNextOffset,
    getScrollStatus,
    getScrollStyles,
    ScrollStatus,
} from './helpers';
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    children?: JSX.Element;
}

export interface State {
    offset: number;
    overlapTarget: number;
    scrolling: boolean;
    intervalId: number | NodeJS.Timer;
    direction: string; // left | right
    recordedWidth: number;
}

export const SCROLL_INTERVAL = 50;

export default class extends Component<Props, State> {
    state = {
        offset: 0,
        overlapTarget: 0,
        scrolling: false,
        intervalId: 0,
        direction: 'left',
        recordedWidth: 0,
    };

    componentDidMount() {
        this.setDimensions();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.children !== prevProps.children) {
            this.reset();
            this.setDimensions();
        }
    }

    reset() {
        this.setState({
            offset: 0,
            overlapTarget: 0,
            scrolling: false,
            intervalId: 0,
            direction: 'left',
        });
    }

    setDimensions(callback = NO_OP) {
        if (this.contentRef) {
            this.setState(calculateDimensions(this.contentRef), callback);
        }
    }

    maybeScroll = () => {
        if (!this.contentRef) {
            return;
        }
        if (didResize(this.contentRef, this.state)) {
            this.setDimensions(() => canScroll(this.state) && this.startScrolling());
        } else if (canScroll(this.state)) {
            this.startScrolling();
        }
    }

    startScrolling() {
        const intervalId = setInterval(this.updateScroll, SCROLL_INTERVAL);
        this.setState({
            intervalId,
            scrolling: true,
        });
    }

    stopScrolling() {
        const { intervalId } = this.state;
        clearInterval(intervalId);
        this.setState({
            scrolling: false,
            intervalId: 0,
            direction: 'left',
            offset: 0,
        });
    }

    updateScroll = () => {
        switch (getScrollStatus(this.state)) {
            case ScrollStatus.LIMIT_LEFT: {
                this.setState({ direction: 'right' });
                break;
            }
            case ScrollStatus.LIMIT_RIGHT: {
                this.stopScrolling();
                break;
            }
            case ScrollStatus.IN_RANGE: {
                this.setState({ offset: getNextOffset(this.state) });
                break;
            }
            default: {
                this.stopScrolling();
                break;
            }
        }
    }

    setRef = (el: HTMLElement) => {
        this.contentRef = el;
    }

    contentRef: HTMLElement;

    render({ children, className = '' }: Props) {
        return (
            <div
                class={`${s.scrollingMarquee__wrap} ${className}`}
                onMouseEnter={this.maybeScroll}
            >
                <div
                    ref={this.setRef}
                    class={s.scrollingMarquee__content}
                    style={getScrollStyles(this.state)}
                >
                    {children}
                </div>
            </div>
        );
    }
}
