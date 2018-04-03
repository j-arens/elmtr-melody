import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import rootReducer from './rootReducer';

const devTools = [];
// const isDevelopment = process.env.NODE_ENV === 'development';
const hasDevTools = window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__');

// if (isDevelopment && hasDevTools) {
//     devTools.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
// }

if (hasDevTools) {
    devTools.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const middlewares = compose(
    applyMiddleware(thunk),
    ...devTools,
);

export default () => createStore(rootReducer, initialState, middlewares);
