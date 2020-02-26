module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__:'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier':'error',
    'react/jsx-filename-extension':[
      'warn',{ extensions: ['.jsx', '.js'] }
    ],
    'import/prefer-default-export': 'off',
    "react/prefer-stateless-function": "off",
    "react/state-in-constructor":'off',
    "react/prop-types": 'off',
    "react/forbid-prop-types": 'off',
    "react/static-property-placement": 'off',
  },
};
