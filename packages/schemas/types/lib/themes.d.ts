import { Palette as NaturalPalette } from '@fluent-blocks/colors'

export interface Palette extends Partial<Omit<NaturalPalette, 'keyColor'>> {
  keyColor: [number, number, number] | string
}

export type ThemeName = 'light' | 'dark' | 'highContrast'

export type AccentScheme = 'web' | 'teams' | Palette
