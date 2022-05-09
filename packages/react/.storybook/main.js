const path = require('path')
const tsconfig = path.resolve(__dirname, '../tsconfig.json')
const { mergeConfig } = require('vite')
const get = require('lodash/get')

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
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, outline: false },
    },
    './addons/expand-all/register.js',
  ],
  staticDirs: ['./public'],
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      optimizeDeps: {
        include: [
          ...get(config, ['optimizeDeps', 'include'], []),
          '@storybook/react/dist/esm/client/docs/config',
          '@storybook/react/dist/esm/client/preview/config',
          '@storybook/addon-links/preview.js',
          '@storybook/addon-docs/preview.js',
          '@storybook/addon-actions/preview.js',
          '@storybook/addon-measure/preview.js',
          'faker/locale/en_US',
          'lodash/range',
          'lodash/find',
          'chromatic/isChromatic',
        ],
      },
    })
  },
}
