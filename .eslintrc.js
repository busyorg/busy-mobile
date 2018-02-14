const OFF = 0;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': OFF,
    'global-require': OFF,
    'no-console': OFF,
  },
};
