module.exports = {
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/*.(ts|tsx)',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    transform: {
        '\\.(ts|tsx)$': '<rootDir>/dev/jest/tests-preprocessor.js',
    },
    setupTestFrameworkScriptFile: '<rootDir>/dev/jest/setupTests.js',
    snapshotSerializers: [
        'jest-serializer-html-string',
    ],
    moduleNameMapper: {
        'mediaframe': '<rootDir>/dev/jest/mocks/mediaframe',
        '@redux/actions': '<rootDir>/dev/jest/mocks/actions',
        '@mocks(.*)$': '<rootDir>/dev/jest/mocks/$1',
        '@tracks': '<rootDir>/dev/fixtures/tracks',
        '@fixtures(.*)$': '<rootDir>/dev/fixtures/$1',
        '@utils': '<rootDir>/src/melody/utils',
        '@state-machine': '<rootDir>/src/melody/state-machine',
        '@constants': '<rootDir>/src/melody/constants',
        '@components(.*)$': '<rootDir>/src/melody/components/$1',
        '@views(.*)$': '<rootDir>/src/melody/views/$1',
        '@redux(.*)$': '<rootDir>/src/melody/redux$1',
        '@melody(.*)$': '<rootDir>/src/melody/$1',
        '\\.(scss)$': 'identity-obj-proxy',
    },
};
