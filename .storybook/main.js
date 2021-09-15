const path = require('path')
const tsconfig = path.resolve(__dirname, '../tsconfig.json')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  typescript: {
    check: true,
    checkOptions: { tsconfig },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      tsconfigPath: tsconfig,
    },
  },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
}