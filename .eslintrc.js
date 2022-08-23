// All warnings should be errors.

const eslintrc = {
  parser: '@typescript-eslint/parser',
  extends: 'prettier',
  plugins: [
    '@typescript-eslint',
    'import',
    'lodash',
    'react-hooks',
    'react',
    'security',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'linebreak-style': ['warn', 'unix'],
    'no-loss-of-precision': ['warn'],
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/array-type': [
      'warn',
      {
        default: 'array',
        readonly: 'generic',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'private-static-field',
          'public-static-field',
          'private-instance-field',
          'public-instance-field',
          'private-constructor',
          'public-constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Object: 'Avoid using the `Object` type. Did you mean `object`?',
          Function:
            'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          Boolean: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          Number: 'Avoid using the `Number` type. Did you mean `number`?',
          String: 'Avoid using the `String` type. Did you mean `string`?',
          Symbol: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
        },
        extendDefaults: false,
      },
    ],
    '@typescript-eslint/no-namespace': 'warn',
    '@typescript-eslint/triple-slash-reference': [
      'warn',
      {
        path: 'never',
        types: 'never',
        lib: 'never',
      },
    ],
    '@typescript-eslint/no-misused-new': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/unified-signatures': 'warn',
    '@typescript-eslint/prefer-for-of': 'warn',
    'import/dynamic-import-chunkname': 'warn',
    'import/no-self-import': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-duplicates': 'warn',
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        overrides: {
          constructors: 'off',
          accessors: 'off',
        },
      },
    ],
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    'import/no-unassigned-import': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'security/detect-pseudoRandomBytes': 'warn',
    '@typescript-eslint/no-inferrable-types': [
      'warn',
      {
        ignoreParameters: false,
      },
    ],
    'lodash/chaining': ['warn', 'never'],
    'lodash/import-scope': ['warn', 'method'],
    'arrow-body-style': 'warn',
    // "arrow-parens": ["warn", "as-needed"], // this conflicts with Prettier formatting
    curly: 'warn',
    'constructor-super': 'warn',
    eqeqeq: ['warn', 'smart'],
    'eol-last': 'warn',
    'guard-for-in': 'warn',
    'max-classes-per-file': 'warn',
    'max-lines-per-function': [
      'warn',
      {
        max: 120,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'max-depth': ['warn', 4],
    // "max-len": [
    //   "warn",
    //   {
    //     code: 134,
    //     ignoreComments: true,
    //     ignoreStrings: true,
    //     ignoreTemplateLiterals: true,
    //     ignoreRegExpLiterals: true
    //   }
    // ],  // this conflicts with Prettier formatting
    'new-parens': 'warn',
    'max-lines': [
      'warn',
      {
        max: 1000,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'no-bitwise': 'warn',
    'no-caller': 'warn',
    'no-cond-assign': 'warn',
    'no-console': [
      'warn',
      {
        allow: [
          'log',
          'error',
          'warn',
          'groupCollapsed',
          'group',
          'groupEnd',
          'debug',
          'dirxml',
          'assert',
        ],
      },
    ],
    'no-debugger': 'warn',
    'no-duplicate-case': 'warn',
    'no-empty': 'warn',
    'no-empty-pattern': 'warn',
    'no-eval': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-regexp': 'warn',
    'no-labels': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-new-wrappers': 'warn',
    '@typescript-eslint/no-redeclare': 'warn',
    'no-restricted-syntax': [
      'warn',
      "MemberExpression[object.name='document'][property.name='write']",
      {
        selector: 'TSEnumDeclaration[const=true]',
        message: 'Do not declare const enums use enum',
      },
    ],
    'no-return-await': 'warn',
    'no-restricted-globals': [
      'warn',
      {
        name: 'global',
        message:
          "Do not use global window APIs. Use the proper wrappers (e.g. 'host') instead.",
      },
      {
        name: 'history',
        message:
          "Do not use global window APIs. Use the proper wrappers (e.g. 'host') instead.",
      },
      {
        name: 'location',
        message:
          "Do not use global window APIs. Use the proper wrappers (e.g. 'host') instead.",
      },
      {
        name: 'navigator',
        message:
          "Do not use global window APIs. Use the proper wrappers (e.g. 'host') instead.",
      },
      {
        name: 'setTimeout',
        message:
          "Do not use global window APIs. Use the proper wrappers (e.g. 'host') instead.",
      },
      {
        name: 'window',
        message:
          "Do not use global window APIs. Use the proper wrappers (e.g. 'host') instead.",
      },
      {
        name: 'fdescribe',
        message: 'Focused tests should not be checked in.',
      },
      {
        name: 'fit',
        message: 'Focused tests should not be checked in.',
      },
      {
        name: 'html',
        message: 'Any html (DOM) modifying functions are not allowed.',
      },
      {
        name: 'nativeModules',
        message:
          'No direct access to injected host comms modules. Use `hostCommunicationService`. See https://aka.ms/ns-host-comms-docs',
      },
    ],
    'no-restricted-properties': [
      'warn',
      {
        object: 'test',
        property: 'only',
        message: 'Focused tests should not be checked in.',
      },
      {
        object: 'describe',
        property: 'only',
        message: 'Focused tests should not be checked in.',
      },
      {
        object: 'it',
        property: 'only',
        message: 'Focused tests should not be checked in.',
      },
    ],
    'no-sparse-arrays': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-throw-literal': 'warn',
    'no-trailing-spaces': 'warn',
    'no-undef-init': 'warn',
    'no-unsafe-finally': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'one-var': ['warn', 'never'],
    'prefer-const': 'warn',
    'prefer-object-spread': 'warn',
    'prefer-template': 'warn',
    radix: 'warn',
    'func-names': 'warn',
    'react/jsx-no-target-blank': 'warn',
    'react/jsx-key': 'warn',
    'react/no-find-dom-node': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/display-name': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'spaced-comment': [
      'warn',
      'always',
      {
        markers: ['/', '@function'],
        exceptions: ['*'],
      },
    ],
    'use-isnan': 'warn',
  },
  overrides: [
    {
      files: ['*test.tsx', '*test.ts', '*integration.tsx', '*integration.ts'],
      rules: {
        'max-lines-per-function': 'off',
        'import/no-deprecated': 'off',
        'import/dynamic-import-chunkname': 'off',
        'react/display-name': 'off',
        'max-lines': [
          'warn',
          {
            max: 2000,
            skipComments: true,
            skipBlankLines: true,
          },
        ],
        'no-var': 'off',
      },
    },
    {
      files: ['*-svg.tsx'],
      rules: {
        'max-lines-per-function': 'off',
      },
    },
    {
      files: ['with-*.ts*'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      // all react 'view' files
      files: ['*.tsx'],
      excludedFiles: [
        '*-container.tsx',
        '*test.tsx',
        '*integration.tsx',
        '*-svg.tsx',
      ],
      rules: {
        'max-lines-per-function': [
          'warn',
          {
            max: 480,
            skipComments: true,
            skipBlankLines: true,
          },
        ],
      },
    },
  ],
}

module.exports = eslintrc
