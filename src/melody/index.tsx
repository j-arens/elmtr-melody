import Melody from '@components/Melody';
import { State } from '@redux/type';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Store } from 'redux';
const s = require('./global-styles/base.scss');

/**
 * Render a dismissible error message with a detailed error report
 */
export function makeError(e: Error) {
    // don't render more than one error message
    if (document.querySelector(`.${s.rootError}`)) {
        return;
    }

    document.body.insertAdjacentHTML('beforeend', `
        <div class="${s.rootError}">
            <button class="${s.rootError__btn}">x</button>
            <p>There was a fatal error initializing the Melody audio player.</p>
            <code>${e.name}: ${e.message}</code>
        </div>
    `);

    const errMsg = document.querySelector(`.${s.rootError}`);
    const closeBtn = errMsg.querySelector(`.${s.rootError__btn}`);
    const handler = () => {
        closeBtn.removeEventListener('click', handler);
        errMsg.parentElement.removeChild(errMsg);
    };
    closeBtn.addEventListener('click', handler);
}

/**
 * Render the app
 */
export function makeApp(target: string, store: Store<State>) {
    const app = (
        <Provider store={store}>
            <div className={s.melody__base}>
                <Melody />
            </div>
        </Provider>
    );

    const root: HTMLElement = document.getElementById(target);
    render(app, root, root.firstElementChild as HTMLElement);
}
