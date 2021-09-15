import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  brandTitle: 'React Teams',
  brandImage: 'https://i.ibb.co/T1GptPT/react-library-logo-v2.jpg',

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
