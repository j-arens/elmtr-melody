import BaseButton from '@components/BaseButton/';
import Icon from '@components/Icon/';
import { WithOptionalClassName } from '@melody/components/type';
import { Action } from '@redux/type';
import { h } from 'preact';
const s = require('../style.scss');

export interface DispatchProps {
    toggleDock: (e: Event) => Action;
}

export interface OwnProps extends WithOptionalClassName {
    className?: string;
}

type Props = DispatchProps & OwnProps;

export default ({
    toggleDock,
    className = '',
}: Props) => (
    <BaseButton
        onClick={toggleDock}
        className={`${s.dock__toggle} ${className}`}
    >
        <Icon className={s.dock__toggleIcon} name="settings" />
    </BaseButton>
);
