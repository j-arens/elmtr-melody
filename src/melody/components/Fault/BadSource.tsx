import { cySelector } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <p class={s.ErrorMsg} {...cySelector('error-msg')}>
        Unable to load track, the source was not found.
    </p>
);
