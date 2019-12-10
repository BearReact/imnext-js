module.exports = {
    rootDir: '../../',
    collectCoverageFrom: [
        'src/utils/**/*.test.{js,jsx}',
    ],
    setupFiles: ['<rootDir>/test/jest/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@static(.*)$': '<rootDir>/static/$1',
        '@lang(.*)$': '<rootDir>/src/resources/lang/$1',
        '@assets(.*)$': '<rootDir>/src/resources/assets/$1',
        '@themes(.*)$': '<rootDir>/src/resources/themes/$1',
        '@pages(.*)$': '<rootDir>/src/pages/$1',
        '@components(.*)$': '<rootDir>/src/resources/components/$1',
        '@utils(.*)$': '<rootDir>/src/utils$1',
        '@library(.*)$': '<rootDir>/src/library/$1',
        '@services(.*)$': '<rootDir>/src/services/$1',
        '@config(.*)$': '<rootDir>/src/config/$1',
        '@middleware(.*)$': '<rootDir>/src/middleware/$1',
    },
    globals: {},
};
