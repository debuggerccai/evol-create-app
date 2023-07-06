module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [0, 'always', ['lower-case', 'camel-case']],
    'type-empty': [0],
    'scope-empty': [0],
    'subject-empty': [0],
  },
}
