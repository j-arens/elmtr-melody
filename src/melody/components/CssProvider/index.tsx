import { CustomProperties, State } from '@redux/type';
import { Component, h } from 'preact';
import { connect } from 'preact-redux';

interface Props {
    customProperties: CustomProperties;
    className: string;
    children?: JSX.Element[];
}

const mapStateToProps = (state: State) => ({
    customProperties: state.ui.customProperties,
});

class CssProvider extends Component<Props, {}> {

    ref: HTMLElement = null;

    componentDidMount() {
        if (this.ref) {
            this.setProps();
        }
    }

    setProps() {
        const { customProperties } = this.props;
        const prefixed = this.prefix(customProperties);
        Object.keys(prefixed).map(k => this.ref.style.setProperty(k, prefixed[k]));
    }

    prefix = props => Object.keys(props)
        .reduce((acc, p) => {
            acc[`--${p}`] = props[p];
            return acc;
        }, {})

    setRef = (elem: HTMLElement) => {
        if (elem) {
            this.ref = elem;
        }
    }

    render() {
        const { children, className } = this.props;
        return (
            <div ref={this.setRef} class={className}>
                {children}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CssProvider);
