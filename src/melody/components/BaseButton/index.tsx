import { WithOptionalClassName } from '@components/type';
import { NO_OP } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    children?: JSX.Element[];
    onClick?: (e: Event) => any;
    key?: string;
    forwardRef?: (el: HTMLElement) => any;
}

export default (props: Props) => (
    <button
        {...props}
        class={`${s.btn} ${props.className || ''}`}
        ref={props.forwardRef ? props.forwardRef : NO_OP}
        role="button"
    >
        {props.children}
    </button>
);
