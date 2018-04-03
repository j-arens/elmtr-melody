import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';
const s = require('./style.scss');

interface Props extends WithOptionalClassName {
    children?: JSX.Element[];
    onClick?: () => any;
    key?: string;
}

const BaseButton = (props: Props) => (
    <button
        {...props}
        class={`${s.btn} ${props.className || ''}`}
    >
        {props.children}
    </button>
);

export default BaseButton;
