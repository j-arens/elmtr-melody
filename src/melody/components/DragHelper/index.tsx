import { WithOptionalClassName } from '@melody/components/type';
import { AnyComponent, Component, h } from 'preact';
import {
    EventRegistry,
    Handler,
    HandlerSet,
    ListeningEvents,
    MelodyDragEvent,
    State,
} from './type';

export default <Props extends WithOptionalClassName>(WrappedComponent: AnyComponent<any, any>) => {
    return class extends Component<Props, State> {
        state = {
            isDragging: false,
            initX: 0,
            initY: 0,
        };

        registry: EventRegistry = new Map();

        ref: HTMLElement;

        componentDidMount() {
            if (!this.ref) {
                return;
            }

            this.ref.addEventListener('mousedown', this.initDragEvent);
            this.ref.addEventListener('mousedown', this.fire);
            document.addEventListener('mousemove', this.fire);
            document.addEventListener('mouseup', this.endDragEvent);
            document.addEventListener('mouseup', this.fire);
            this.ref.addEventListener('touchstart', this.initDragEvent);
            this.ref.addEventListener('touchstart', this.fire);
            this.ref.addEventListener('touchmove', this.fire);
            this.ref.addEventListener('touchend', this.endDragEvent);
            this.ref.addEventListener('touchend', this.fire);
        }

        componentWillUnMount() {
            if (!this.ref) {
                return;
            }

            this.ref.removeEventListener('mousedown', this.initDragEvent);
            this.ref.removeEventListener('mousedown', this.fire);
            document.removeEventListener('mousemove', this.fire);
            document.removeEventListener('mouseup', this.endDragEvent);
            document.removeEventListener('mouseup', this.fire);
            this.ref.removeEventListener('touchstart', this.initDragEvent);
            this.ref.removeEventListener('touchstart', this.fire);
            this.ref.removeEventListener('touchmove', this.fire);
            this.ref.removeEventListener('touchend', this.endDragEvent);
            this.ref.removeEventListener('touchend', this.fire);

            this.registry.clear();
        }

        setDragRef = (ref: HTMLElement) => {
            this.ref = ref;
        }

        initDragEvent = (e: MouseEvent & TouchEvent) => {
            if (e.which === 3) {
                return;
            }

            let initX;
            let initY;

            if (e.touches) {
                initX = e.touches[0].clientX;
                initY = e.touches[0].clientY;
            } else {
                initX = e.clientX;
                initY = e.clientY;
            }

            this.setState({
                isDragging: true,
                initX,
                initY,
            });
        }

        endDragEvent = (e: MouseEvent & TouchEvent) => {
            if (!this.state.isDragging) {
                return;
            }

            let x;
            let y;

            if (e.changedTouches) {
                x = e.changedTouches[0].clientX;
                y = e.changedTouches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }

            const { initX, initY } = this.state;

            if (initX !== x || initY !== y) {
                this.fire(e);
            }

            this.setState({
                isDragging: false,
            });
        }

        normalizeEvent(e: MouseEvent & TouchEvent): MelodyDragEvent {
            let modifiedEvent: MelodyDragEvent;

            switch (e.type) {
                case 'touchstart':
                case 'touchmove': {
                    modifiedEvent = Object.assign({}, e, {
                        clientX: e.touches[0].clientX,
                        clientY: e.touches[0].clientY,
                    });
                    break;
                }
                case 'touchend': {
                    modifiedEvent = Object.assign({}, e, {
                        clientX: e.changedTouches[0].clientX,
                        clientY: e.changedTouches[0].clientY,
                    });
                    break;
                }
                default: {
                    modifiedEvent = e;
                }
            }

            return modifiedEvent;
        }

        fire = (e: MouseEvent & TouchEvent) => {
            if (!this.state.isDragging) {
                return;
            }

            const { type } = e;

            if (!this.registry.has(type)) {
                return;
            }

            const event = this.normalizeEvent(e);
            const handlers: HandlerSet = this.registry.get(type);

            handlers.forEach((fn) => fn.call(WrappedComponent, event));
        }

        on(fn: Handler, ...events: ListeningEvents[]) {
            events.map((event) => {
                if (this.registry.has(event)) {
                    const handlers: HandlerSet = this.registry.get(event);

                    if (handlers.has(fn)) {
                        return;
                    }

                    handlers.add(fn);
                    return;
                }

                this.registry.set(event, new Set([fn]));
            });
        }

        dragStart = (fn: Handler) => this.on(fn, 'mousedown', 'touchstart');
        drag = (fn: Handler) => this.on(fn, 'mousemove', 'touchmove');
        dragEnd = (fn: Handler) => this.on(fn, 'mouseup', 'touchend');

        render(props, state) {
            return (
                <WrappedComponent
                    setDragRef={this.setDragRef}
                    onDragStart={this.dragStart}
                    onDrag={this.drag}
                    onDragEnd={this.dragEnd}
                    isDragging={state.isDragging}
                    {...props}
                />
            );
        }
    };
};
