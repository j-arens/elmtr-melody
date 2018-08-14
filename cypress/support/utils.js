/**
 * Routes to the elementor editor for the passed in post id
 * 
 * @param {number|string} postId 
 * @return {string}
 */
export const elementorEditor = postId =>
    `/wp-admin/post.php?post=${postId}&action=elementor`;

/**
 * Checks if a widget has any tracks set
 * 
 * @return {boolean}
 */
export const widgetHasTracks = () => cy
    .selectTab('content')
    .get('.elementor-repeater-fields-wrapper')
    .then((wrapper) => {
        if (wrapper.find('.elementor-repeater-fields').length) {
            return true;
        }
        return false;
    });

/**
 * Converts hex to rgb
 * 
 * @param {string} hex
 * @return {string} 
 */
export const hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return result ? `rgb(${r}, ${g}, ${b})` : '';
}
