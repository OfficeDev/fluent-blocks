import isObject from 'lodash/isObject'
import isString from 'lodash/isString'

import {
  PaletteConfig,
  hexColorsFromPalette,
  hex_to_LCH,
} from '@fluent-blocks/colors'
import {
  AccentScheme as NaturalAccentScheme,
  ThemeName as NaturalThemeName,
  Palette,
} from '@fluent-blocks/schemas'
import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  webHighContrastTheme,
  webLightTheme,
} from '@fluentui/react-components'

export type ThemeName = NaturalThemeName
export type AccentScheme = NaturalAccentScheme

function isPalette(o: any): o is Palette {
  return isObject(o) && 'keyColor' in o
}

export function getFullLCHPalette({ keyColor, ...props }: Palette) {
  return {
    keyColor: isString(keyColor) ? hex_to_LCH(keyColor) : keyColor,
    darkCp: 2 / 3,
    lightCp: 1 / 3,
    hueTorsion: 0,
    ...props,
  }
}

export const defaultPaletteConfig: PaletteConfig = {
  // The nShades and range values are based on a brand color audit
  nShades: 16,
  range: [1.42, 83.57],
  linearity: 0.77,
}

function getBrandTokensFromPalette(palette: Palette) {
  const hexColors = hexColorsFromPalette(
    getFullLCHPalette(palette),
    defaultPaletteConfig.nShades,
    defaultPaletteConfig.range,
    defaultPaletteConfig.linearity
  )
  return hexColors.reduce((acc: Record<string, string>, hexColor, h) => {
    acc[`${(h + 1) * 10}`] = hexColor
    return acc
  }, {}) as BrandVariants
}

export const getTheme = (
  themeName?: ThemeName,
  accentScheme?: AccentScheme
) => {
  const resolvedAccentScheme = accentScheme || 'web'
  const resolvedThemeName = themeName || 'light'
  if (isPalette(resolvedAccentScheme)) {
    if (resolvedThemeName === 'highContrast') {
      return webHighContrastTheme
    } else {
      const brandTokens = getBrandTokensFromPalette(resolvedAccentScheme)
      if (resolvedThemeName === 'light') {
        return createLightTheme(brandTokens)
      } else {
        return createDarkTheme(brandTokens)
      }
    }
  } else {
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
  onAction: { action: 'action', table: { disable: true } },
}
