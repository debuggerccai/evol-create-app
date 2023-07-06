module.exports = {
  extends: ['airbnb'],
  rules: {
    quotes: ['error', 'single', {
      avoidEscape: true,
    }],
    semi: [2, 'never'],
    indent: ['error', 2],
    'space-infix-ops': ['error', { int32Hint: false }],
    'space-before-blocks': 'error',
    'operator-linebreak': ['error', 'before'],
    'quote-props': ['error', 'as-needed'],
    'no-empty-function': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
  },
}
