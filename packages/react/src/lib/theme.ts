import { z } from 'zod'
import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-components'
import { themeName } from '@fluentui/blocks-schemas'

export type ThemeName = z.infer<typeof themeName>

export const getTeamsTheme = (theme: ThemeName) =>
  ({
    light: teamsLightTheme,
    dark: teamsDarkTheme,
    ['high-contrast']: teamsHighContrastTheme,
  }[theme] ?? teamsLightTheme)

export const themeArgType = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    control: {
      type: 'inline-radio',
      options: ['light', 'dark', 'high-contrast'],
      labels: { light: 'Light', dark: 'Dark', 'high-contrast': 'HC' },
      defaultValue: 'light',
    },
    table: { type: { summary: 'Theme' }, defaultValue: { summary: 'light' } },
  },
}
