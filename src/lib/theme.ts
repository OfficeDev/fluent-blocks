import { z } from 'zod'
import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-components'

export const theme = z.union([
  z.literal('light'),
  z.literal('dark'),
  z.literal('high-contrast'),
])

export type Theme = z.infer<typeof theme>

export const getTeamsTheme = (theme: Theme) => (
    {
      light: teamsLightTheme,
      dark: teamsDarkTheme,
      ['high-contrast']: teamsHighContrastTheme,
    }[theme] ?? teamsLightTheme
  )
