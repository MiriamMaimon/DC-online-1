module.exports = {
    sourceType: 'module',
  env: {
    "node": true,
    "jest": true,
  },
  ignorePatterns: [".eslintrc.js"],
  extends: [
    "plugin:@typescript-eslint/recommended"
  ],
  ignoreDestructuring: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    // Make sure your IDE is configured correctly for this rule. For Visual Studio Code:
    // 1. To use tabs for indentation type Ctrl+Shift+P and then "Indent Using Tabs" and make sure to select tab size = 2.
    // 2. Convert spaces to tabs (so you do not have to manually change it) type Ctrl+Shift+P and then "Indent Using Tabs"
    // 3. With the above settings you should be able to automatically convert spaces to tabs by using the format command (e.g. CTRL + SHIFT + F) 
    "@typescript-eslint/indent": [ 
      "error",
      "tab",
      {
        "ignoredNodes": [
          "PropertyDefinition[decorators]",
          "TSUnionType"
        ],
        "SwitchCase": 1
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        },
      },
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },

      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase"],
        // "leadingUnderscore": "require"
      },
      {
        "selector": "memberLike",
        "modifiers": ["public"],
        "format": ["camelCase"],
      },
      {
        "selector": "memberLike",
        "modifiers": ["requiresQuotes"],
        "format": null,
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      }
    ],

    '@typescript-eslint/explicit-function-return-type': 'error', 
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'error', // JUL: This should be set to off only in the context of the CMR, where we need to work with placeholders
    "semi": 'error',
    "linebreak-style": ["error", "windows"],
    "max-len": [
      "error",
      {
        "code": 150,
        "ignoreTrailingComments": true
      }
    ],
    "padding-line-between-statements": [ 
      "error",
      {
        "blankLine": "always",
        "prev": [
          "const",
          "let",
          "var"
        ],
        "next": "*"
      },
      {
        "blankLine": "any",
        "prev": [
          "const",
          "let",
          "var"
        ],
        "next": [
          "const",
          "let",
          "var"
        ]
      },
      {
        "blankLine": "always",
        "prev": [
          "block-like"
        ],
        "next": "*"
      }
    ],
    "max-lines": [
      "warn",
      {
        "max": 500, 
        "skipBlankLines": true,
        "skipComments": true
      }
    ],
    //The three rules below are about line breaks enforcement. This might need more research to find a better configuration.
    "object-property-newline": [
      "error",
      { "allowMultiplePropertiesPerLine": false }
    ],
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": {
          "consistent": true,
          "minProperties": 4
        },
        "ObjectPattern": {
          "consistent": true,
          "minProperties": 4
        },
        "ImportDeclaration": "never",
        "ExportDeclaration": "never"
      }
    ],
    "array-bracket-newline": [
      "error",
      {
        "multiline": true
      }
    ],
    "brace-style": ["error", "stroustrup"],
    "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
    "default-case": ["error"],
    "no-duplicate-imports": ["error"],
    "no-await-in-loop": ["error"],
    "no-promise-executor-return": ["error"],
    "no-template-curly-in-string": ["error"],
    "curly": ["error", "multi-line"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  }
};
