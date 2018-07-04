import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <p class={s.ErrorMsg}>
        No tracks are loaded. If you think this an error try refreshing the page, otherwise please contact support.
    </p>
);
