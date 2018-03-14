/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBAL = window;
exports.$ = exports.GLOBAL.jQuery;
exports.DEV_MODE = true;
exports.PANEL_HOOK = 'panel/open_editor/widget/melody-audio-player';
exports.TRACKS_KEY = 'melody_audio_tracks';
exports.CONTAINER_CLASS = '.repeater-fields';
exports.FIELD_SELECTOR = 'data-melody-ap-field';
exports.TRACK_TRIGGER = 'data-melody-ap-track-trigger';
exports.HIDDEN_CLASS = 'elementor-hidden';
exports.REVEAL_SELECTOR = 'data-melody-ap-reveal';
exports.IMAGE_SELECTOR = 'data-melody-ap-image-preview';
exports.IMAGE_TRIGGER = 'data-melody-ap-image-trigger';
exports.TRIGGER_DATA_ATTR = 'melody-ap-trigger-action';


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mediaframe_1 = __webpack_require__(2);
const accesors_1 = __webpack_require__(3);
const ui_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(0);
/**
 * Elementor settings model interface
 */
const settings = {
    model: null,
    retrieve() {
        return this.model.get('settings');
    },
};
/**
 * Reset track artwork
 */
function resetImage(e) {
    const { $container, model, state, } = accesors_1.getTrackResources(e, settings.retrieve());
    const mutation = { artwork: '' };
    accesors_1.setTrackState(model, state, mutation);
    ui_1.removeImage($container);
}
/**
 * Reset track model and it's UI
 */
function resetTrack(e) {
    const { $container, model, state, } = accesors_1.getTrackResources(e, settings.retrieve());
    const mutation = {
        id: '',
        title: '',
        album: '',
        artist: '',
        artwork: '',
        duration: '',
    };
    accesors_1.setTrackState(model, state, mutation);
    ui_1.hideUI($container);
    ui_1.removeImage($container);
    ui_1.swapTrackTrigger(constants_1.$(e.target), 'SELECT_TRACK');
}
/**
 * Load a wp media picker frame
 */
function loadMediaFrame(e, type) {
    let mediaFrame = null;
    switch (type) {
        case 'audio':
            mediaFrame = mediaframe_1.audioFrame;
            break;
        case 'image': {
            mediaFrame = mediaframe_1.imageFrame;
            break;
        }
        default: {
            return;
        }
    }
    if (!mediaFrame) {
        return;
    }
    const resources = accesors_1.getTrackResources(e, settings.retrieve());
    mediaFrame._melodyResources = resources;
    mediaFrame.open();
}
/**
 * Process text input changes
 */
function handleChange(e) {
    const { model, state } = accesors_1.getTrackResources(e, settings.retrieve());
    const field = constants_1.$(e.target).closest(`[${constants_1.FIELD_SELECTOR}]`).attr(constants_1.FIELD_SELECTOR);
    const mutation = { [field]: constants_1.$(e.target).val() };
    accesors_1.setTrackState(model, state, mutation);
}
/**
 * Process audioFrame selections
 */
function handleAudioSelection() {
    const { _melodyResources: { $container, index, model, state, }, } = mediaframe_1.audioFrame;
    const $trigger = $container.find(`[${constants_1.TRACK_TRIGGER}]`);
    const attachment = mediaframe_1.audioFrame.state().get('selection').first().toJSON();
    const { id, title, meta: { album, artist }, image: { src }, url, fileLength } = attachment;
    const mutation = { id, title, album, artist, artwork: src, url, duration: fileLength };
    const newState = accesors_1.setTrackState(model, state, mutation);
    ui_1.updateUI($container, newState);
    ui_1.showUI($container);
    ui_1.swapTrackTrigger($trigger, 'CLEAR_TRACK');
}
/**
 * Process imageFrame selections
 */
function handleImageSelection() {
    const { _melodyResources: { $container, index, model, state, }, } = mediaframe_1.imageFrame;
    const attachment = mediaframe_1.imageFrame.state().get('selection').first().toJSON();
    const { url } = attachment;
    const mutation = { artwork: url };
    accesors_1.setTrackState(model, state, mutation);
    ui_1.setImage($container, url);
}
/**
 * Route events
 */
function handleTrigger(e) {
    const action = constants_1.$(e.target).data(constants_1.TRIGGER_DATA_ATTR);
    switch (action) {
        case 'SELECT_TRACK': {
            loadMediaFrame(e, 'audio');
            break;
        }
        case 'CLEAR_TRACK': {
            resetTrack(e);
            break;
        }
        case 'ADD_IMAGE': {
            loadMediaFrame(e, 'image');
            break;
        }
        case 'CLEAR_IMAGE': {
            resetImage(e);
            break;
        }
        default: {
            return;
        }
    }
}
/**
 * Bind events to handlers
 */
function bindEvents({ currentPageView: { $el } }) {
    $el.on('click', `[${constants_1.TRACK_TRIGGER}]`, handleTrigger);
    $el.on('input', `[${constants_1.FIELD_SELECTOR}] input`, handleChange);
    $el.on('click', `[${constants_1.IMAGE_TRIGGER}]`, handleTrigger);
    mediaframe_1.audioFrame.on('insert select', handleAudioSelection);
    mediaframe_1.imageFrame.on('insert select', handleImageSelection);
}
/**
 * Entry point. Setup Panel, Model, and events.
 */
function main(panel, model) {
    if (constants_1.DEV_MODE) {
        constants_1.GLOBAL.mapPanel = panel;
        constants_1.GLOBAL.mapModel = model;
        constants_1.GLOBAL.mapAudioFrame = mediaframe_1.audioFrame;
        constants_1.GLOBAL.mapImageFrame = mediaframe_1.imageFrame;
    }
    settings.model = model;
    bindEvents(panel);
}
/**
 * Hook
 */
constants_1.$(() => constants_1.GLOBAL.elementor.hooks.addAction(constants_1.PANEL_HOOK, main));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(0);
const { wp: { media } } = constants_1.GLOBAL;
/**
 * Initialize a wp media picker for audio
 */
function initAudioFrame() {
    return media({
        button: { test: 'Select' },
        states: [
            new media.controller.Library({
                title: 'Select Track',
                button: { text: 'Select Track' },
                library: media.query({ type: 'audio' }),
                multiple: false,
                date: false,
                autoSelect: false,
            }),
        ],
    });
}
/**
 * Initialize a wp media picker for images
 */
function initImageFrame() {
    return media({
        button: { text: 'Select' },
        states: [
            new media.controller.Library({
                title: 'Select Artwork',
                button: { text: 'Select Artwork' },
                library: media.query({ type: 'image' }),
                multiple: false,
                date: false,
                autoSelect: false,
            }),
        ],
    });
}
exports.audioFrame = initAudioFrame();
exports.imageFrame = initImageFrame();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(0);
/**
 * Get an attribute off of a Model
 */
exports.getAttr = (model, key) => model.get(key);
/**
 * Set attributes on a Model
 */
exports.setAttrs = (model, attrs) => model.set(attrs);
/**
 * Get a TrackModel
 */
exports.getTrackModel = (model, index) => exports.getAttr(model, constants_1.TRACKS_KEY).at(index);
/**
 * Get the field's container element
 */
exports.getFieldContainer = ({ target }) => constants_1.$(target).closest(constants_1.CONTAINER_CLASS);
/**
 * Get the index of a $container in the context of other $containers
 */
exports.getContainerIndex = ($container) => $container.index(constants_1.CONTAINER_CLASS);
/**
 * Get TrackResources when a en event happens on a field
 */
function getTrackResources(e, settings) {
    const $container = exports.getFieldContainer(e);
    const index = exports.getContainerIndex($container);
    const model = exports.getTrackModel(settings, index);
    const state = exports.getAttr(model, 'melody_wp_media_picker');
    return { $container, index, model, state };
}
exports.getTrackResources = getTrackResources;
/**
 * Mutate and update TrackState
 */
function setTrackState(model, state, mutation) {
    const updated = Object.assign({}, state, mutation);
    const newModel = exports.setAttrs(model, { melody_wp_media_picker: updated });
    return exports.getAttr(newModel, 'melody_wp_media_picker');
}
exports.setTrackState = setTrackState;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(0);
const helpers_1 = __webpack_require__(5);
/**
 * Hide audiopicker container
 */
function hideUI($container) {
    $container
        .find(`[${constants_1.REVEAL_SELECTOR}]`)
        .addClass(constants_1.HIDDEN_CLASS);
}
exports.hideUI = hideUI;
/**
 * Show audipicker container
 */
function showUI($container) {
    $container
        .find(`[${constants_1.REVEAL_SELECTOR}]`)
        .removeClass(constants_1.HIDDEN_CLASS);
}
exports.showUI = showUI;
/**
 * Update audiopicker container
 */
function updateUI($container, values) {
    const fields = [
        'title',
        'album',
        'artist',
    ];
    fields.map(field => $container
        .find(`[${constants_1.FIELD_SELECTOR}="${field}"] input`)
        .val(values[field]));
    setImage($container, values.artwork);
}
exports.updateUI = updateUI;
/**
 * Set an image within a container
 */
function setImage($container, url) {
    $container
        .find('.elementor-control-media')
        .removeClass('media-empty')
        .find(`[${constants_1.IMAGE_SELECTOR}]`)
        .css({ 'background-image': `url(${url})` });
}
exports.setImage = setImage;
/**
 * Remove an image within a container
 */
function removeImage($container) {
    $container
        .find('.elementor-control-media')
        .addClass('media-empty')
        .find(`[${constants_1.IMAGE_SELECTOR}]`)
        .css({ backgroundImage: '' });
}
exports.removeImage = removeImage;
/**
 * Swap the action performed by a trigger
 */
function swapTrackTrigger($trigger, action) {
    $trigger.attr('data-melody-ap-trigger-action', action);
    $trigger.text(`${helpers_1.capatilize(action.split('_').shift().toLowerCase())} Track`);
}
exports.swapTrackTrigger = swapTrackTrigger;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Capatilize a string
 */
function capatilize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capatilize = capatilize;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW9QaWNrZXIuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGU0ZGRhMTk3YjE0MjZiMzU2NDJiIiwid2VicGFjazovLy9hc3NldHMvc3JjL2F1ZGlvLXBpY2tlci9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vL2Fzc2V0cy9zcmMvYXVkaW8tcGlja2VyL2luZGV4LnRzIiwid2VicGFjazovLy9hc3NldHMvc3JjL2F1ZGlvLXBpY2tlci9tZWRpYWZyYW1lLnRzIiwid2VicGFjazovLy9hc3NldHMvc3JjL2F1ZGlvLXBpY2tlci9hY2Nlc29ycy50cyIsIndlYnBhY2s6Ly8vYXNzZXRzL3NyYy9hdWRpby1waWNrZXIvdWkudHMiLCJ3ZWJwYWNrOi8vL2Fzc2V0cy9zcmMvYXVkaW8tcGlja2VyL2hlbHBlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTRkZGExOTdiMTQyNmIzNTY0MmIiLCJleHBvcnQgY29uc3QgR0xPQkFMID0gKHdpbmRvdyBhcyBhbnkpO1xuZXhwb3J0IGNvbnN0IHsgalF1ZXJ5OiAkIH0gPSBHTE9CQUw7XG5leHBvcnQgY29uc3QgREVWX01PREUgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IFBBTkVMX0hPT0sgPSAncGFuZWwvb3Blbl9lZGl0b3Ivd2lkZ2V0L21lbG9keS1hdWRpby1wbGF5ZXInO1xuZXhwb3J0IGNvbnN0IFRSQUNLU19LRVkgPSAnbWVsb2R5X2F1ZGlvX3RyYWNrcyc7XG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0NMQVNTID0gJy5yZXBlYXRlci1maWVsZHMnO1xuZXhwb3J0IGNvbnN0IEZJRUxEX1NFTEVDVE9SID0gJ2RhdGEtbWVsb2R5LWFwLWZpZWxkJztcbmV4cG9ydCBjb25zdCBUUkFDS19UUklHR0VSID0gJ2RhdGEtbWVsb2R5LWFwLXRyYWNrLXRyaWdnZXInO1xuZXhwb3J0IGNvbnN0IEhJRERFTl9DTEFTUyA9ICdlbGVtZW50b3ItaGlkZGVuJztcbmV4cG9ydCBjb25zdCBSRVZFQUxfU0VMRUNUT1IgPSAnZGF0YS1tZWxvZHktYXAtcmV2ZWFsJztcbmV4cG9ydCBjb25zdCBJTUFHRV9TRUxFQ1RPUiA9ICdkYXRhLW1lbG9keS1hcC1pbWFnZS1wcmV2aWV3JztcbmV4cG9ydCBjb25zdCBJTUFHRV9UUklHR0VSID0gJ2RhdGEtbWVsb2R5LWFwLWltYWdlLXRyaWdnZXInO1xuZXhwb3J0IGNvbnN0IFRSSUdHRVJfREFUQV9BVFRSID0gJ21lbG9keS1hcC10cmlnZ2VyLWFjdGlvbic7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFzc2V0cy9zcmMvYXVkaW8tcGlja2VyL2NvbnN0YW50cy50cyIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IHsgYXVkaW9GcmFtZSwgaW1hZ2VGcmFtZSB9IGZyb20gJy4vbWVkaWFmcmFtZSc7XG5pbXBvcnQge1xuICAgIFNldHRpbmdzTW9kZWwsXG4gICAgRnJhbWVUeXBlLFxuICAgIFBhbmVsLFxuICAgIFRyaWdnZXJBY3Rpb24sXG4gICAgTWVsb2R5UmVzb3VyY2VzLFxuICAgIE1lZGlhRnJhbWUsXG4gICAgVHJhY2tTdGF0ZSxcbiAgICBUcmFja1Jlc291cmNlcyxcbiAgICBBdWRpb1BpY2tlckZpZWxkLFxuICAgIFRyYWNrTXV0YXRpb24sXG59IGZyb20gJy4vdHlwZSc7XG5pbXBvcnQge1xuICAgIGdldFRyYWNrUmVzb3VyY2VzLFxuICAgIHNldFRyYWNrU3RhdGUsXG59IGZyb20gJy4vYWNjZXNvcnMnO1xuaW1wb3J0IHtcbiAgICB1cGRhdGVVSSxcbiAgICBzaG93VUksXG4gICAgaGlkZVVJLFxuICAgIHNldEltYWdlLFxuICAgIHJlbW92ZUltYWdlLFxuICAgIHN3YXBUcmFja1RyaWdnZXIsXG59IGZyb20gJy4vdWknO1xuaW1wb3J0IHtcbiAgICBHTE9CQUwsXG4gICAgJCxcbiAgICBERVZfTU9ERSxcbiAgICBQQU5FTF9IT09LLFxuICAgIEZJRUxEX1NFTEVDVE9SLFxuICAgIFRSQUNLX1RSSUdHRVIsXG4gICAgSU1BR0VfVFJJR0dFUixcbiAgICBUUklHR0VSX0RBVEFfQVRUUixcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogRWxlbWVudG9yIHNldHRpbmdzIG1vZGVsIGludGVyZmFjZVxuICovXG5jb25zdCBzZXR0aW5nczogU2V0dGluZ3NNb2RlbCA9IHtcbiAgICBtb2RlbDogbnVsbCxcbiAgICByZXRyaWV2ZSgpOiBNb2RlbCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmdldCgnc2V0dGluZ3MnKTtcbiAgICB9LFxufTtcblxuLyoqXG4gKiBSZXNldCB0cmFjayBhcnR3b3JrXG4gKi9cbmZ1bmN0aW9uIHJlc2V0SW1hZ2UoZTogSlF1ZXJ5LkV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgICAkY29udGFpbmVyLFxuICAgICAgICBtb2RlbCxcbiAgICAgICAgc3RhdGUsXG4gICAgfTogVHJhY2tSZXNvdXJjZXMgPSBnZXRUcmFja1Jlc291cmNlcyhlLCBzZXR0aW5ncy5yZXRyaWV2ZSgpKTtcbiAgICBjb25zdCBtdXRhdGlvbjogVHJhY2tNdXRhdGlvbiA9IHsgYXJ0d29yazogJycgfTtcbiAgICBzZXRUcmFja1N0YXRlKG1vZGVsLCBzdGF0ZSwgbXV0YXRpb24pO1xuICAgIHJlbW92ZUltYWdlKCRjb250YWluZXIpO1xufVxuXG4vKipcbiAqIFJlc2V0IHRyYWNrIG1vZGVsIGFuZCBpdCdzIFVJXG4gKi9cbmZ1bmN0aW9uIHJlc2V0VHJhY2soZTogSlF1ZXJ5LkV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgICAkY29udGFpbmVyLFxuICAgICAgICBtb2RlbCxcbiAgICAgICAgc3RhdGUsXG4gICAgfTogVHJhY2tSZXNvdXJjZXMgPSBnZXRUcmFja1Jlc291cmNlcyhlLCBzZXR0aW5ncy5yZXRyaWV2ZSgpKTtcbiAgICBjb25zdCBtdXRhdGlvbjogVHJhY2tNdXRhdGlvbiA9IHtcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGFsYnVtOiAnJyxcbiAgICAgICAgYXJ0aXN0OiAnJyxcbiAgICAgICAgYXJ0d29yazogJycsXG4gICAgICAgIGR1cmF0aW9uOiAnJyxcbiAgICB9O1xuICAgIHNldFRyYWNrU3RhdGUobW9kZWwsIHN0YXRlLCBtdXRhdGlvbik7XG4gICAgaGlkZVVJKCRjb250YWluZXIpO1xuICAgIHJlbW92ZUltYWdlKCRjb250YWluZXIpO1xuICAgIHN3YXBUcmFja1RyaWdnZXIoJChlLnRhcmdldCksICdTRUxFQ1RfVFJBQ0snKTtcbn1cblxuLyoqXG4gKiBMb2FkIGEgd3AgbWVkaWEgcGlja2VyIGZyYW1lXG4gKi9cbmZ1bmN0aW9uIGxvYWRNZWRpYUZyYW1lKGU6IEpRdWVyeS5FdmVudCwgdHlwZTogRnJhbWVUeXBlKTogdm9pZCB7XG4gICAgbGV0IG1lZGlhRnJhbWUgPSBudWxsO1xuICAgIFxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdhdWRpbyc6XG4gICAgICAgICAgICBtZWRpYUZyYW1lID0gYXVkaW9GcmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpbWFnZSc6IHtcbiAgICAgICAgICAgIG1lZGlhRnJhbWUgPSBpbWFnZUZyYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmICghbWVkaWFGcmFtZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJlc291cmNlczogVHJhY2tSZXNvdXJjZXMgPSBnZXRUcmFja1Jlc291cmNlcyhlLCBzZXR0aW5ncy5yZXRyaWV2ZSgpKTtcbiAgICBtZWRpYUZyYW1lLl9tZWxvZHlSZXNvdXJjZXMgPSByZXNvdXJjZXM7XG4gICAgbWVkaWFGcmFtZS5vcGVuKCk7XG59XG5cbi8qKlxuICogUHJvY2VzcyB0ZXh0IGlucHV0IGNoYW5nZXNcbiAqL1xuZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGU6IEpRdWVyeS5FdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHsgbW9kZWwsIHN0YXRlIH06IFRyYWNrUmVzb3VyY2VzID0gZ2V0VHJhY2tSZXNvdXJjZXMoZSwgc2V0dGluZ3MucmV0cmlldmUoKSk7XG4gICAgY29uc3QgZmllbGQ6IEF1ZGlvUGlja2VyRmllbGQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KGBbJHtGSUVMRF9TRUxFQ1RPUn1dYCkuYXR0cihGSUVMRF9TRUxFQ1RPUik7XG4gICAgY29uc3QgbXV0YXRpb246IFRyYWNrTXV0YXRpb24gPSB7IFtmaWVsZF06ICQoZS50YXJnZXQpLnZhbCgpIH07XG4gICAgc2V0VHJhY2tTdGF0ZShtb2RlbCwgc3RhdGUsIG11dGF0aW9uKTtcbn1cblxuLyoqXG4gKiBQcm9jZXNzIGF1ZGlvRnJhbWUgc2VsZWN0aW9uc1xuICovXG5mdW5jdGlvbiBoYW5kbGVBdWRpb1NlbGVjdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICAgIF9tZWxvZHlSZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICRjb250YWluZXIsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgIH0sXG4gICAgfTogTWVkaWFGcmFtZSA9IGF1ZGlvRnJhbWU7XG4gICAgY29uc3QgJHRyaWdnZXI6IEpRdWVyeSA9ICRjb250YWluZXIuZmluZChgWyR7VFJBQ0tfVFJJR0dFUn1dYCk7XG4gICAgY29uc3QgYXR0YWNobWVudCA9IGF1ZGlvRnJhbWUuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLmZpcnN0KCkudG9KU09OKCk7XG4gICAgY29uc3QgeyBpZCwgdGl0bGUsIG1ldGE6IHsgYWxidW0sIGFydGlzdCB9LCBpbWFnZTogeyBzcmMgfSwgdXJsLCBmaWxlTGVuZ3RoIH0gPSBhdHRhY2htZW50O1xuICAgIGNvbnN0IG11dGF0aW9uOiBUcmFja011dGF0aW9uID0geyBpZCwgdGl0bGUsIGFsYnVtLCBhcnRpc3QsIGFydHdvcms6IHNyYywgdXJsLCBkdXJhdGlvbjogZmlsZUxlbmd0aCB9O1xuICAgIGNvbnN0IG5ld1N0YXRlOiBUcmFja1N0YXRlID0gc2V0VHJhY2tTdGF0ZShtb2RlbCwgc3RhdGUsIG11dGF0aW9uKTtcbiAgICB1cGRhdGVVSSgkY29udGFpbmVyLCBuZXdTdGF0ZSk7XG4gICAgc2hvd1VJKCRjb250YWluZXIpO1xuICAgIHN3YXBUcmFja1RyaWdnZXIoJHRyaWdnZXIsICdDTEVBUl9UUkFDSycpO1xufVxuXG4vKipcbiAqIFByb2Nlc3MgaW1hZ2VGcmFtZSBzZWxlY3Rpb25zXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUltYWdlU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHtcbiAgICAgICAgX21lbG9keVJlc291cmNlczoge1xuICAgICAgICAgICAgJGNvbnRhaW5lcixcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgfSxcbiAgICB9OiBNZWRpYUZyYW1lID0gaW1hZ2VGcmFtZTtcbiAgICBjb25zdCBhdHRhY2htZW50ID0gaW1hZ2VGcmFtZS5zdGF0ZSgpLmdldCgnc2VsZWN0aW9uJykuZmlyc3QoKS50b0pTT04oKTtcbiAgICBjb25zdCB7IHVybCB9ID0gYXR0YWNobWVudDtcbiAgICBjb25zdCBtdXRhdGlvbjogVHJhY2tNdXRhdGlvbiA9IHsgYXJ0d29yazogdXJsIH07XG4gICAgc2V0VHJhY2tTdGF0ZShtb2RlbCwgc3RhdGUsIG11dGF0aW9uKTtcbiAgICBzZXRJbWFnZSgkY29udGFpbmVyLCB1cmwpO1xufVxuXG4vKipcbiAqIFJvdXRlIGV2ZW50c1xuICovXG5mdW5jdGlvbiBoYW5kbGVUcmlnZ2VyKGU6IEpRdWVyeS5FdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGFjdGlvbjogVHJpZ2dlckFjdGlvbiA9ICQoZS50YXJnZXQpLmRhdGEoVFJJR0dFUl9EQVRBX0FUVFIpO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnU0VMRUNUX1RSQUNLJzoge1xuICAgICAgICAgICAgbG9hZE1lZGlhRnJhbWUoZSwgJ2F1ZGlvJyk7ICAgXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdDTEVBUl9UUkFDSyc6IHtcbiAgICAgICAgICAgIHJlc2V0VHJhY2soZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdBRERfSU1BR0UnOiB7XG4gICAgICAgICAgICBsb2FkTWVkaWFGcmFtZShlLCAnaW1hZ2UnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0NMRUFSX0lNQUdFJzoge1xuICAgICAgICAgICAgcmVzZXRJbWFnZShlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBCaW5kIGV2ZW50cyB0byBoYW5kbGVyc1xuICovXG5mdW5jdGlvbiBiaW5kRXZlbnRzKHsgY3VycmVudFBhZ2VWaWV3OiB7ICRlbCB9IH06IFBhbmVsKTogdm9pZCB7XG4gICAgJGVsLm9uKCdjbGljaycsIGBbJHtUUkFDS19UUklHR0VSfV1gLCBoYW5kbGVUcmlnZ2VyKTtcbiAgICAkZWwub24oJ2lucHV0JywgYFske0ZJRUxEX1NFTEVDVE9SfV0gaW5wdXRgLCBoYW5kbGVDaGFuZ2UpO1xuICAgICRlbC5vbignY2xpY2snLCBgWyR7SU1BR0VfVFJJR0dFUn1dYCwgaGFuZGxlVHJpZ2dlcik7XG4gICAgYXVkaW9GcmFtZS5vbignaW5zZXJ0IHNlbGVjdCcsIGhhbmRsZUF1ZGlvU2VsZWN0aW9uKTtcbiAgICBpbWFnZUZyYW1lLm9uKCdpbnNlcnQgc2VsZWN0JywgaGFuZGxlSW1hZ2VTZWxlY3Rpb24pO1xufVxuXG4vKipcbiAqIEVudHJ5IHBvaW50LiBTZXR1cCBQYW5lbCwgTW9kZWwsIGFuZCBldmVudHMuXG4gKi9cbmZ1bmN0aW9uIG1haW4ocGFuZWw6IFBhbmVsLCBtb2RlbDogTW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgR0xPQkFMLm1hcFBhbmVsID0gcGFuZWw7XG4gICAgICAgIEdMT0JBTC5tYXBNb2RlbCA9IG1vZGVsO1xuICAgICAgICBHTE9CQUwubWFwQXVkaW9GcmFtZSA9IGF1ZGlvRnJhbWU7XG4gICAgICAgIEdMT0JBTC5tYXBJbWFnZUZyYW1lID0gaW1hZ2VGcmFtZTtcbiAgICB9XG5cbiAgICBzZXR0aW5ncy5tb2RlbCA9IG1vZGVsO1xuICAgIGJpbmRFdmVudHMocGFuZWwpO1xufVxuXG4vKipcbiAqIEhvb2tcbiAqL1xuJCgoKSA9PiBHTE9CQUwuZWxlbWVudG9yLmhvb2tzLmFkZEFjdGlvbihQQU5FTF9IT09LLCBtYWluKSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFzc2V0cy9zcmMvYXVkaW8tcGlja2VyL2luZGV4LnRzIiwiaW1wb3J0IHsgR0xPQkFMIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVkaWFGcmFtZSB9IGZyb20gJy4vdHlwZSc7XG5cbmNvbnN0IHsgd3A6IHsgbWVkaWEgfSB9ID0gR0xPQkFMO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSB3cCBtZWRpYSBwaWNrZXIgZm9yIGF1ZGlvXG4gKi9cbmZ1bmN0aW9uIGluaXRBdWRpb0ZyYW1lKCk6IE1lZGlhRnJhbWUge1xuICAgIHJldHVybiBtZWRpYSh7XG4gICAgICAgIGJ1dHRvbjogeyB0ZXN0OiAnU2VsZWN0JyB9LFxuICAgICAgICBzdGF0ZXM6IFtcbiAgICAgICAgICAgIG5ldyBtZWRpYS5jb250cm9sbGVyLkxpYnJhcnkoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnU2VsZWN0IFRyYWNrJyxcbiAgICAgICAgICAgICAgICBidXR0b246IHsgdGV4dDogJ1NlbGVjdCBUcmFjaycgfSxcbiAgICAgICAgICAgICAgICBsaWJyYXJ5OiBtZWRpYS5xdWVyeSh7IHR5cGU6ICdhdWRpbycgfSksXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRhdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGF1dG9TZWxlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgfSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIHdwIG1lZGlhIHBpY2tlciBmb3IgaW1hZ2VzXG4gKi9cbmZ1bmN0aW9uIGluaXRJbWFnZUZyYW1lKCk6IE1lZGlhRnJhbWUge1xuICAgIHJldHVybiBtZWRpYSh7XG4gICAgICAgIGJ1dHRvbjogeyB0ZXh0OiAnU2VsZWN0JyB9LFxuICAgICAgICBzdGF0ZXM6IFtcbiAgICAgICAgICAgIG5ldyBtZWRpYS5jb250cm9sbGVyLkxpYnJhcnkoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnU2VsZWN0IEFydHdvcmsnLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogeyB0ZXh0OiAnU2VsZWN0IEFydHdvcmsnIH0sXG4gICAgICAgICAgICAgICAgbGlicmFyeTogbWVkaWEucXVlcnkoeyB0eXBlOiAnaW1hZ2UnIH0pLFxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkYXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhdXRvU2VsZWN0OiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgYXVkaW9GcmFtZTogTWVkaWFGcmFtZSA9IGluaXRBdWRpb0ZyYW1lKCk7XG5leHBvcnQgY29uc3QgaW1hZ2VGcmFtZTogTWVkaWFGcmFtZSA9IGluaXRJbWFnZUZyYW1lKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFzc2V0cy9zcmMvYXVkaW8tcGlja2VyL21lZGlhZnJhbWUudHMiLCJpbXBvcnQgeyAkLCBUUkFDS1NfS0VZLCBDT05UQUlORVJfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ2JhY2tib25lJztcbmltcG9ydCB7XG4gICAgVHJhY2tSZXNvdXJjZXMsXG4gICAgVHJhY2tTdGF0ZSxcbiAgICBUcmFja011dGF0aW9uLFxufSBmcm9tICcuL3R5cGUnO1xuXG4vKipcbiAqIEdldCBhbiBhdHRyaWJ1dGUgb2ZmIG9mIGEgTW9kZWxcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHIgPSAoXG4gICAgbW9kZWw6IE1vZGVsLFxuICAgIGtleTogc3RyaW5nXG4pOiBhbnkgPT4gbW9kZWwuZ2V0KGtleSk7XG5cbi8qKlxuICogU2V0IGF0dHJpYnV0ZXMgb24gYSBNb2RlbFxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cnMgPSAoXG4gICAgbW9kZWw6IE1vZGVsLFxuICAgIGF0dHJzOiBPYmplY3Rcbik6IGFueSA9PiBtb2RlbC5zZXQoYXR0cnMpO1xuXG4vKipcbiAqIEdldCBhIFRyYWNrTW9kZWxcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRyYWNrTW9kZWwgPSAoXG4gICAgbW9kZWw6IE1vZGVsLFxuICAgIGluZGV4OiBudW1iZXJcbik6IE1vZGVsID0+IGdldEF0dHIobW9kZWwsIFRSQUNLU19LRVkpLmF0KGluZGV4KTtcblxuLyoqXG4gKiBHZXQgdGhlIGZpZWxkJ3MgY29udGFpbmVyIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEZpZWxkQ29udGFpbmVyID0gKFxuICAgIHsgdGFyZ2V0IH06IEpRdWVyeS5FdmVudCxcbik6IEpRdWVyeSA9PiAkKHRhcmdldCkuY2xvc2VzdChDT05UQUlORVJfQ0xBU1MpO1xuXG4vKipcbiAqIEdldCB0aGUgaW5kZXggb2YgYSAkY29udGFpbmVyIGluIHRoZSBjb250ZXh0IG9mIG90aGVyICRjb250YWluZXJzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb250YWluZXJJbmRleCA9IChcbiAgICAkY29udGFpbmVyOiBKUXVlcnlcbik6IG51bWJlciA9PiAkY29udGFpbmVyLmluZGV4KENPTlRBSU5FUl9DTEFTUyk7XG5cblxuLyoqXG4gKiBHZXQgVHJhY2tSZXNvdXJjZXMgd2hlbiBhIGVuIGV2ZW50IGhhcHBlbnMgb24gYSBmaWVsZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhY2tSZXNvdXJjZXMoXG4gICAgZTogSlF1ZXJ5LkV2ZW50LFxuICAgIHNldHRpbmdzOiBNb2RlbCxcbik6IFRyYWNrUmVzb3VyY2VzIHtcbiAgICBjb25zdCAkY29udGFpbmVyID0gZ2V0RmllbGRDb250YWluZXIoZSk7XG4gICAgY29uc3QgaW5kZXggPSBnZXRDb250YWluZXJJbmRleCgkY29udGFpbmVyKTtcbiAgICBjb25zdCBtb2RlbCA9IGdldFRyYWNrTW9kZWwoc2V0dGluZ3MsIGluZGV4KTtcbiAgICBjb25zdCBzdGF0ZSA9IGdldEF0dHIobW9kZWwsICdtZWxvZHlfd3BfbWVkaWFfcGlja2VyJyk7XG4gICAgcmV0dXJuIHsgJGNvbnRhaW5lciwgaW5kZXgsIG1vZGVsLCBzdGF0ZSB9O1xufVxuXG4vKipcbiAqIE11dGF0ZSBhbmQgdXBkYXRlIFRyYWNrU3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRyYWNrU3RhdGUoXG4gICAgbW9kZWw6IE1vZGVsLFxuICAgIHN0YXRlOiBUcmFja1N0YXRlLFxuICAgIG11dGF0aW9uOiBUcmFja011dGF0aW9uLFxuKTogVHJhY2tTdGF0ZSB7XG4gICAgY29uc3QgdXBkYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBtdXRhdGlvbik7XG4gICAgY29uc3QgbmV3TW9kZWwgPSBzZXRBdHRycyhtb2RlbCwgeyBtZWxvZHlfd3BfbWVkaWFfcGlja2VyOiB1cGRhdGVkIH0pO1xuICAgIHJldHVybiBnZXRBdHRyKG5ld01vZGVsLCAnbWVsb2R5X3dwX21lZGlhX3BpY2tlcicpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhc3NldHMvc3JjL2F1ZGlvLXBpY2tlci9hY2Nlc29ycy50cyIsImltcG9ydCB7XG4gICAgUkVWRUFMX1NFTEVDVE9SLFxuICAgIEhJRERFTl9DTEFTUyxcbiAgICBJTUFHRV9TRUxFQ1RPUixcbiAgICBGSUVMRF9TRUxFQ1RPUixcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgY2FwYXRpbGl6ZSB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBUcmlnZ2VyQWN0aW9uIH0gZnJvbSAnLi90eXBlJztcblxuLyoqXG4gKiBIaWRlIGF1ZGlvcGlja2VyIGNvbnRhaW5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZVVJKCRjb250YWluZXI6IEpRdWVyeSk6IHZvaWQge1xuICAgICRjb250YWluZXJcbiAgICAgICAgLmZpbmQoYFske1JFVkVBTF9TRUxFQ1RPUn1dYClcbiAgICAgICAgLmFkZENsYXNzKEhJRERFTl9DTEFTUyk7XG59XG5cbi8qKlxuICogU2hvdyBhdWRpcGlja2VyIGNvbnRhaW5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1VJKCRjb250YWluZXI6IEpRdWVyeSk6IHZvaWQge1xuICAgICRjb250YWluZXJcbiAgICAgICAgLmZpbmQoYFske1JFVkVBTF9TRUxFQ1RPUn1dYClcbiAgICAgICAgLnJlbW92ZUNsYXNzKEhJRERFTl9DTEFTUyk7XG59XG5cbi8qKlxuICogVXBkYXRlIGF1ZGlvcGlja2VyIGNvbnRhaW5lciBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVVJKCRjb250YWluZXI6IEpRdWVyeSwgdmFsdWVzKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGRzID0gW1xuICAgICAgICAndGl0bGUnLFxuICAgICAgICAnYWxidW0nLFxuICAgICAgICAnYXJ0aXN0JyxcbiAgICBdO1xuICAgIFxuICAgIGZpZWxkcy5tYXAoZmllbGQgPT4gJGNvbnRhaW5lclxuICAgICAgICAuZmluZChgWyR7RklFTERfU0VMRUNUT1J9PVwiJHtmaWVsZH1cIl0gaW5wdXRgKVxuICAgICAgICAudmFsKHZhbHVlc1tmaWVsZF0pXG4gICAgKTtcbiAgICBcbiAgICBzZXRJbWFnZSgkY29udGFpbmVyLCB2YWx1ZXMuYXJ0d29yayk7XG59XG5cbi8qKlxuICogU2V0IGFuIGltYWdlIHdpdGhpbiBhIGNvbnRhaW5lciBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEltYWdlKCRjb250YWluZXI6IEpRdWVyeSwgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAkY29udGFpbmVyXG4gICAgICAgIC5maW5kKCcuZWxlbWVudG9yLWNvbnRyb2wtbWVkaWEnKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ21lZGlhLWVtcHR5JylcbiAgICAgICAgLmZpbmQoYFske0lNQUdFX1NFTEVDVE9SfV1gKVxuICAgICAgICAuY3NzKHsgJ2JhY2tncm91bmQtaW1hZ2UnOiBgdXJsKCR7dXJsfSlgIH0pO1xufVxuXG4vKipcbiAqIFJlbW92ZSBhbiBpbWFnZSB3aXRoaW4gYSBjb250YWluZXIgIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSW1hZ2UoJGNvbnRhaW5lcjogSlF1ZXJ5KTogdm9pZCB7XG4gICAgJGNvbnRhaW5lclxuICAgICAgICAuZmluZCgnLmVsZW1lbnRvci1jb250cm9sLW1lZGlhJylcbiAgICAgICAgLmFkZENsYXNzKCdtZWRpYS1lbXB0eScpXG4gICAgICAgIC5maW5kKGBbJHtJTUFHRV9TRUxFQ1RPUn1dYClcbiAgICAgICAgLmNzcyh7IGJhY2tncm91bmRJbWFnZTogJycgfSk7XG59XG5cbi8qKlxuICogU3dhcCB0aGUgYWN0aW9uIHBlcmZvcm1lZCBieSBhIHRyaWdnZXIgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzd2FwVHJhY2tUcmlnZ2VyKFxuICAgICR0cmlnZ2VyOiBKUXVlcnksXG4gICAgYWN0aW9uOiBUcmlnZ2VyQWN0aW9uXG4pOiB2b2lkIHtcbiAgICAkdHJpZ2dlci5hdHRyKCdkYXRhLW1lbG9keS1hcC10cmlnZ2VyLWFjdGlvbicsIGFjdGlvbik7XG4gICAgJHRyaWdnZXIudGV4dChgJHtjYXBhdGlsaXplKGFjdGlvbi5zcGxpdCgnXycpLnNoaWZ0KCkudG9Mb3dlckNhc2UoKSl9IFRyYWNrYCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFzc2V0cy9zcmMvYXVkaW8tcGlja2VyL3VpLnRzIiwiLyoqXG4gKiBDYXBhdGlsaXplIGEgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXBhdGlsaXplKHN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhc3NldHMvc3JjL2F1ZGlvLXBpY2tlci9oZWxwZXJzLnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1hBO0FBYUE7QUFJQTtBQVFBO0FBWUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDOU5BO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzVDQTtBQVFBOztBQUVBO0FBQ0E7QUFLQTs7QUFFQTtBQUNBO0FBS0E7O0FBRUE7QUFDQTtBQUtBOztBQUVBO0FBQ0E7QUFJQTs7QUFFQTtBQUNBO0FBS0E7O0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7O0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7Ozs7Ozs7Ozs7QUNoRUE7QUFNQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFiQTtBQWVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBOztBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFOQTs7Ozs7Ozs7OztBQ3RFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=