import { create } from '@storybook/theming/create'
import brandImage from './public/brandImage.svg'

export default create({
  base: 'light',
  brandTitle: 'Fluent React Patterns',
  brandImage,
  colorPrimary: '#6264A7',

  // UI
  appBg: '#EBEBEB',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 6,

  // Typography
  fontBase: `"Segoe UI", Segoe UI, system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`,
  fontCode: 'monospace',

  // Form colors
  inputBorderRadius: 6,
})
