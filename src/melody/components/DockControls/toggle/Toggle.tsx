import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { cySelector } from '@utils/index';
import { Component, h } from 'preact';
const throttle = require('lodash.throttle');
const s = require('../style.scss');

export interface DispatchProps {
    toggleDock: (target: EventTarget, wrapperId: string) => Action;
}

export interface StateProps {
    showDock: boolean;
    wrapperId: string;
}

interface HOCProps {
    onEditorChange: (cb: () => any) => void;
}

export type OwnProps = WithOptionalClassName;

type Props = DispatchProps & StateProps & HOCProps & OwnProps;

export default class extends Component<Props, {}> {
    static defaultProps = {
        classname: '',
    };

    el: HTMLElement;

    componentDidMount() {
        const { onEditorChange } = this.props;
        onEditorChange(this.closeDock);
        window.addEventListener('resize', this.closeDock);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.closeDock);
    }

    setRef = (el: HTMLElement) => {
        this.el = el;
    }

    handleClick = ({ target }: Event) => {
        const { wrapperId, toggleDock } = this.props;
        toggleDock(target, wrapperId);
    }

    // too lazy to update the dock controls coordinates on window resize,
    // just toggling the dock controls closed instead
    closeDock = throttle(() => {
        const { showDock } = this.props;
        if (showDock) {
            this.el.dispatchEvent(new Event('click'));
        }
    }, 1000);

    render({ className }: Props) {
        return (
            <BaseButton
                onClick={this.handleClick}
                forwardRef={this.setRef}
                className={`${s.dock__toggle} ${className}`}
                {...cySelector('dock-toggle')}
            >
                <Icon className={s.dock__toggleIcon} name="settings" />
            </BaseButton>
        );
    }
}
