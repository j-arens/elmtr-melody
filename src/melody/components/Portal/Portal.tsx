/* tslint:disable */
import { Component, h, render } from 'preact';
import PortalProxy from './PortalProxy';

// https://github.com/developit/preact-portal

interface Props {
    into: string;
}

export default class extends Component<Props, {}> {
    isMounted: boolean;

    remote: Element;

    into: Element;

    intoPointer: string;

	componentDidUpdate(props) {
		for (const i in props) {
			if (props[i] !== this.props[i]) {
				return setTimeout(this.renderLayer);
			}
		}
    }

	componentDidMount() {
		this.isMounted = true;
		this.renderLayer = this.renderLayer.bind(this);
		this.renderLayer();
	}

	componentWillUnmount() {
		this.renderLayer(false);
		this.isMounted = false;
		if (this.remote) {
            this.remote.parentNode.removeChild(this.remote);
        }
	}

	findNode(node) {
		return typeof node === 'string' ? document.querySelector(node) : node;
	}

	renderLayer(show = true) {
		if (!this.isMounted) {
            return;
        }

		// clean up old node if moving bases:
		if (this.props.into !== this.intoPointer) {
            this.intoPointer = this.props.into;

			         if (this.into && this.remote) {
				this.remote = render(<PortalProxy />, this.into, this.remote);
            }

			         this.into = this.findNode(this.props.into);
		}

		this.remote = render((
			<PortalProxy context={this.context}>
				{show && this.props.children || null}
			</PortalProxy>
		), this.into, this.remote);
	}

	render() {
		return null;
	}
}
