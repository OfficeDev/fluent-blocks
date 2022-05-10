import { nanoid } from 'nanoid'

import { NamedPalette, NamedTheme } from './types'

export const paletteTemplate = (): NamedPalette & { id: string } => ({
  id: nanoid(),
  name: '',
  keyColor: [44.51, 39.05, 288.84],
  darkCp: 2 / 3,
  lightCp: 1 / 3,
  hueTorsion: 0,
})

export const themeTemplate = (): NamedTheme & { id: string } => ({
  id: nanoid(),
  name: '',
  backgrounds: {},
  foregrounds: {},
})
