import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    children?: JSX.Element[];
    onClick?: (e: Event) => any;
    key?: string;
}

export default (props: Props) => (
    <button
        {...props}
        class={`${s.btn} ${props.className || ''}`}
        role="button"
    >
        {props.children}
    </button>
);
