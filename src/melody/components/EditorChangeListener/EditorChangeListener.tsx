import Wiretap from '@adapter/Wiretap';
import * as throttle from 'lodash.throttle';
import { AnyComponent, Component, h } from 'preact';

export interface StateProps {
    wrapperId: string;
}

export default (WrappedComponent: AnyComponent<any, any>) =>
    class extends Component<StateProps, {}> {
        callbacks: Set<() => any> = new Set();

        tap: Wiretap;

        componentDidMount() {
            this.tap = new Wiretap();
            this.tap.on('editor', 'change', this.fireEditorChange);
        }

        componentWillUnmount() {
            if (this.tap) {
                this.tap.off('editor', 'change', this.fireEditorChange);
            }
            this.callbacks.clear();
        }

        fireEditorChange = throttle((_, { model: { id } }) => {
            const { wrapperId } = this.props;
            if (id === wrapperId) {
                this.callbacks.forEach(cb => cb.call(WrappedComponent));
            }
        }, 1000);

        onEditorChange = (cb: () => any) => {
            if (!this.callbacks.has(cb)) {
                this.callbacks.add(cb);
            }
        }

        render(props) {
            return (
                <WrappedComponent
                    {...props}
                    onEditorChange={this.onEditorChange}
                />
            );
        }
    };
