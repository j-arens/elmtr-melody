const elementor = require('./mocks/elementor');

// set global melody object
global.MELODY = {};

// setup global vars before importing files
global.MELODY_ENV = {
    siteUrl: 'https://lolz-music.com',
};

// set global elementor mock
global.elementor = elementor;
