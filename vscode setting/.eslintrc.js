module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 0,
    'prettier/prettier': ['error'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 2,
    semi: 2,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'class-methods-use-this': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'one-var-declaration-per-line': 0,
    'one-var': 0,
    'max-len': [1, { code: 160 }],
    'no-unused-vars': 0,
    'no-undef': 0,
    'object-curly-newline': 0,
    'arrow-parens': [2, 'as-needed'],
    'no-unused-expressions': [
      2,
      { allowShortCircuit: true, allowTernary: true },
    ],
    'implicit-arrow-linebreak': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: "avoid",
        endOfLine: 'lf'
      },
    ],
    "arrow-parens": 0
  },
};
