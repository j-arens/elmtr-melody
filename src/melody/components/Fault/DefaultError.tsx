import Icon from '@components/Icon';
import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <span>
        <Icon className={s.errorContainer__icon} name="error" />
        <p class="melody__body">Something went wrong!</p>
    </span>
);
