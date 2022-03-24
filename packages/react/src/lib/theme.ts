import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  webLightTheme,
  webDarkTheme,
  webHighContrastTheme,
} from '@fluentui/react-components'
import {
  ThemeName as NaturalThemeName,
  AccentScheme as NaturalAccentScheme,
} from '@fluent-blocks/schemas'

export type ThemeName = NaturalThemeName
export type AccentScheme = NaturalAccentScheme

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
          case 'highContrast':
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
          case 'highContrast':
            return webHighContrastTheme
          case 'dark':
            return webDarkTheme
          default:
            return webLightTheme
        }
      })()
  }
}

export const contextArgTypes = {
  themeName: {
    name: 'Theme',
    options: ['light', 'dark', 'highContrast'],
    control: {
      type: 'inline-radio',
      labels: { light: 'Light', dark: 'Dark', highContrast: 'HC' },
    },
    table: {
      type: { summary: 'ThemeName' },
      defaultValue: { summary: 'light' },
    },
  },
  accentScheme: {
    name: 'Accent palette',
    options: ['web', 'teams'],
    control: {
      type: 'inline-radio',
      labels: { web: 'Web', teams: 'Teams' },
    },
    table: {
      type: { summary: 'AccentScheme' },
      defaultValue: { summary: 'web' },
    },
  },
  onAction: { action: 'action' },
}
