const path = require('path')
const tsconfig = path.resolve(__dirname, '../tsconfig.json')

module.exports = {
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
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, outline: false },
    },
    './addons/expand-all/register.js',
  ],
  staticDirs: ['./public'],
  core: {
    channelOptions: {
      allowFunction: false,
    },
  },
  features: {
    buildStoriesJson: true,
  },
}
