import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <p class={s.ErrorMsg}>
        No tracks loaded, click here to get started.
    </p>
);
