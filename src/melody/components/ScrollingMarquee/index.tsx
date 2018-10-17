import { WithOptionalClassName } from '@components/type';
import { Component, h } from 'preact';
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    children?: JSX.Element;
}

interface State {
    offset: number;
    target: number;
    scrolling: boolean;
    intervalId: number | NodeJS.Timer;
    direction: string; // left | right
}

interface ScrollStyles {
    transition?: string;
    transform?: string;
}

const SCROLL_INTERVAL = 50;

export default class extends Component<Props, State> {
    state = {
        offset: 0,
        target: 0,
        scrolling: false,
        intervalId: 0,
        direction: 'left',
    };

    componentDidMount() {
        this.calculateOverflow();
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.children !== prevProps.children) {
            this.reset();
            this.calculateOverflow();
        }
    }

    reset() {
        this.setState({
            offset: 0,
            target: 0,
            scrolling: false,
            intervalId: 0,
            direction: 'left',
        });
    }

    calculateOverflow() {
        const offsetWidth = this.contentRef.offsetWidth;
        const scrollWidth = this.contentRef.scrollWidth;
        if (offsetWidth < scrollWidth) {
            const target = Math.ceil((scrollWidth - offsetWidth) / offsetWidth * 100);
            this.setState({ target });
        }
    }

    startScrolling = () => {
        const { scrolling, target } = this.state;
        if (scrolling || !target) {
            return;
        }
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
        const { offset, target, direction } = this.state;
        if (offset === target && direction === 'left') {
            this.setState({ direction: 'right' });
            return;
        }
        if (offset === 0 && direction === 'right') {
            this.stopScrolling();
            return;
        }
        const nextOffset = direction === 'right' ? offset - 1 : offset + 1;
        this.setState({ offset: nextOffset });
    }

    getStyle(): ScrollStyles {
        const { scrolling, target, offset } = this.state;
        if (!scrolling || !target) {
            return {};
        }
        return {
            transform: `translate3d(-${offset}%, 0, 0)`,
            transition: `transform ${SCROLL_INTERVAL}ms linear`,
        };
    }

    setRef = (el: HTMLElement) => {
        this.contentRef = el;
    }

    contentRef: HTMLElement;

    render({ children, className = '' }: Props) {
        return (
            <div
                class={`${s.scrollingMarquee__wrap} ${className}`}
                onMouseEnter={this.startScrolling}
            >
                <div
                    ref={this.setRef}
                    class={s.scrollingMarquee__content}
                    style={this.getStyle()}
                >
                    {children}
                </div>
            </div>
        );
    }
}
