import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { Component, h } from 'preact';
const throttle = require('lodash.throttle');
const s = require('../style.scss');

export interface DispatchProps {
    toggleDock: (e: Event) => Action;
}

export interface StateProps {
    showDock: boolean;
}

type Props = DispatchProps & StateProps & WithOptionalClassName;

export default class extends Component<Props, {}> {
    static defaultProps = {
        classname: '',
    };

    el: HTMLElement;

    componentDidMount() {
        window.addEventListener('resize', this.closeDock);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closeDock);
    }

    setRef = (el: HTMLElement) => {
        this.el = el;
    }

    // too lazy to update the dock controls coordinates on window resize,
    // just toggling the dock controls closed instead
    closeDock = throttle(() => {
        const { showDock } = this.props;
        if (showDock) {
            this.el.dispatchEvent(new Event('click'));
        }
    }, 2000);

    render({ toggleDock, className }: Props) {
        return (
            <BaseButton
                onClick={toggleDock}
                forwardRef={this.setRef}
                className={`${s.dock__toggle} ${className}`}
            >
                <Icon className={s.dock__toggleIcon} name="settings" />
            </BaseButton>
        );
    }
}
