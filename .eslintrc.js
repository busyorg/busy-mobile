const OFF = 0;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': OFF,
    'react/default-props-match-prop-types': OFF,
    'global-require': OFF,
    'no-console': OFF,
    'no-constant-condition': OFF,
  },
};
