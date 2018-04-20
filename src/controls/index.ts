import { GLOBAL } from './constants';
import trackpicker from './trackpicker';
// import imagepicker from './imagepicker';

const { jQuery: $ } = GLOBAL;

$(() => {
    trackpicker();
    // imagepicker();
});
