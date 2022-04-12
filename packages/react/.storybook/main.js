const path = require('path')
const tsconfig = path.resolve(__dirname, '../tsconfig.json')

module.exports = {
  core: { builder: '@storybook/builder-vite' },
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.test-stories.@(ts|tsx)',
  ],
  typescript: {
    check: true,
    checkOptions: { tsconfig },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      tsconfigPath: tsconfig,
    },
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    './addons/expand-all/register.js',
  ],
}
