module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
  ],
  'overrides': [],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['prettier', 'react', '@typescript-eslint'],
  'rules': {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
