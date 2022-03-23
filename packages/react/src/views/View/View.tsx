import { AccentScheme, ThemeName } from '@fluent-blocks/schemas'

import {
  FluentBlocksProvider,
  WithActionHandler,
  Translations,
  defaultTranslations,
} from '../../lib'

import { Main } from '../../surfaces'
import { SectionContentProps } from '../../blocks'

export interface ViewProps extends WithActionHandler<any> {
  main: SectionContentProps
  themeName?: ThemeName
  accentScheme?: AccentScheme
  translations?: Translations
  basicSpriteUrl?: string
}

/** An experience provided to the user via their device’s canvas. */
export const View = ({
  main,
  themeName = 'light',
  accentScheme = 'web',
  translations = defaultTranslations,
  basicSpriteUrl,
  onAction,
}: ViewProps) => (
  <FluentBlocksProvider
    {...{
      themeName,
      accentScheme,
      translations,
      onAction,
      basicSpriteUrl,
    }}
  >
    <Main {...main} />
  </FluentBlocksProvider>
)
