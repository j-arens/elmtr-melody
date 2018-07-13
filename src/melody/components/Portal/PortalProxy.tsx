/* tslint:disable */
import { Component, h } from 'preact';

// https://github.com/developit/preact-portal

// high-order component that renders its first child if it exists.
// used as a conditional rendering proxy.

interface Props {
    context?: any;
    children?: JSX.Element;
}

export default class extends Component<Props, {}> {
	getChildContext() {
		return this.props.context;
    }

	render({ children }: Props) {
		return children && children[0] || null;
	}
}
