import { z, ZodTypeAny } from 'zod'
import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-components'

export const themeName = z.union([
  z.literal('light'),
  z.literal('dark'),
  z.literal('high-contrast'),
])
export type ThemeName = z.infer<typeof themeName>

export function themedMap<T extends ZodTypeAny>(valueSchema: T) {
  return z.object({
    light: valueSchema,
    dark: valueSchema,
    'high-contrast': valueSchema,
  })
}

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
