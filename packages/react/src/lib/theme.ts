import { z } from 'zod'
import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  webLightTheme,
  webDarkTheme,
  webHighContrastTheme,
} from '@fluentui/react-components'
import { themeName, accentScheme } from '@fluentui/blocks-schemas'

export type ThemeName = z.infer<typeof themeName>
export type AccentScheme = z.infer<typeof accentScheme>

export const getTheme = (
  themeName?: ThemeName,
  accentScheme?: AccentScheme
) => {
  const resolvedAccentScheme = accentScheme || 'web'
  const resolvedThemeName = themeName || 'light'
  switch (resolvedAccentScheme) {
    case 'teams':
      return (() => {
        switch (resolvedThemeName) {
          case 'high-contrast':
            return teamsHighContrastTheme
          case 'dark':
            return teamsDarkTheme
          default:
            return teamsLightTheme
        }
      })()
    default:
      return (() => {
        switch (resolvedThemeName) {
          case 'high-contrast':
            return webHighContrastTheme
          case 'dark':
            return webDarkTheme
          default:
            return webLightTheme
        }
      })()
  }
}

export const themeArgType = {
  themeName: {
    name: 'Theme',
    defaultValue: 'light',
    control: {
      type: 'inline-radio',
      options: ['light', 'dark', 'high-contrast'],
      labels: { light: 'Light', dark: 'Dark', 'high-contrast': 'HC' },
      defaultValue: 'light',
    },
    table: {
      type: { summary: 'ThemeName' },
      defaultValue: { summary: 'light' },
    },
  },
  accentScheme: {
    name: 'Accent palette',
    defaultValue: 'web',
    control: {
      type: 'inline-radio',
      options: ['web', 'teams'],
      labels: { web: 'Web', teams: 'Teams' },
      defaultValue: 'web',
    },
    table: {
      type: { summary: 'AccentScheme' },
      defaultValue: { summary: 'web' },
    },
  },
}
