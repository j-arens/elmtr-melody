import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <p class={s.ErrorMsg}>
        Something went wrong! Please try refreshing the page, otherwise contact the site administrator.
    </p>
);
