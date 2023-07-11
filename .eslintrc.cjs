/** @format */

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'html'],
    rules: {
        indent: 'off',
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'import/extensions': 0,
        'no-param-reassign': 0,
        'no-console': 0,
        'import/no-unresolved': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-explicit-any': 0,
    },
};
