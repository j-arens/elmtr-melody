/* tslint:disable:max-line-length */
import { cySelector } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <p class={s.ErrorMsg} {...cySelector('error-msg')}>
        No tracks are loaded. If you think this an error try refreshing the page, otherwise please contact the site administrator.
    </p>
);
