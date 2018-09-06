const elementor = require('./mocks/elementor');

// setup global vars before importing files
global.MELODY_ENV = {
    pluginsUrl: 'http://my-site.com/plugins-url',
    siteUrl: 'https://lolz-music.com',
};

// set global elementor mock
global.elementor = elementor;
