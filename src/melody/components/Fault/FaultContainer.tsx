import BaseButton from '@components/BaseButton/';
import { h } from 'preact';
const s = require('./style.scss');

interface Props {
    children?: JSX.Element[];
    allowReload?: boolean;
}

export default ({ children, allowReload = true }: Props) => (
    <div class={s.errorContainer}>
        {children}
        {allowReload &&
            <BaseButton
                onClick={window.location.reload.bind(window.location)}
                className={s.errorContainer__reloadBtn}
            >
                Reload
            </BaseButton>
        }
    </div>
);
