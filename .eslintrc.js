const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:flowtype/recommended'
    ],
    plugins: ['prettier', 'redux-saga', 'react', 'jsx-a11y', 'flowtype'],
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'no-alert': 'off',
        'no-unused-vars': 'off',
        'max-len': 'off',
        'object-curly-spacing': ['error', 'never'],
        'prefer-destructuring': 'off',
        'comma-dangle': ['error', 'never'],
        'no-underscore-dangle': ['error', {allow: ['__NEXT_DATA__']}],
        'no-script-url': 'off',
        'consistent-return': 'off',
        indent: ['error', 4, {SwitchCase: 1}],
        semi: 'error',
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-tag-spacing': 'off',
        'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
        'react/no-danger': 'off',
        'react/prefer-stateless-function': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/alt-text': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': [2, {caseSensitive: true}],
        'import/prefer-default-export': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'react/jsx-key': 'error',
        'quotes': ['error', 'single'],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './internals/webpack/webpack.prod.babel.js'
            }
        },
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: 'React', // Pragma to use, default to "React"
            version: '16.8.6', // React version, default to the latest React stable release
            flowVersion: '0.97' // Flow version
        },
        flowtype: {
            onlyFilesWithFlowAnnotation: true //只在添加flow註釋的文件才做檢查
        }
    },
    globals: {
        alert: true,
        window: true,
        document: true,
        api: true,
        appVersion: true,
        siteConfig: true,
        envConfig: true,
        iMoneyCode: true
    }
};
