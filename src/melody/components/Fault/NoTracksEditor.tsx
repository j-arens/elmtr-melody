import { cySelector } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <p class={s.ErrorMsg} {...cySelector('error-msg')}>
        No tracks loaded, click here to open the settings in the sidebar.
    </p>
);
