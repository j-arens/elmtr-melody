import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { cySelector } from '@utils/index';
import * as throttle from 'lodash.throttle';
import { Component, h } from 'preact';
const s = require('../style.scss');

export interface DispatchProps {
    toggleDock: (target: EventTarget) => Action;
}

export interface StateProps {
    showDock: boolean;
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

    handleClick = ({ target }: Event) => this.props.toggleDock(target);

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
