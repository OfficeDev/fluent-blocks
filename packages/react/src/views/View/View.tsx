import { ViewProps as NaturalViewProps } from '@fluent-blocks/schemas'

import { SectionContentProps } from '../../blocks'
import { FluentBlocksProvider, defaultTranslations } from '../../lib'
import { WithActionHandler } from '../../props'
import { Main } from '../../surfaces'

export interface ViewProps
  extends Omit<NaturalViewProps, 'main'>,
    WithActionHandler<any> {
  main: SectionContentProps
  iconSpriteUrl?: string
}

/** An experience provided to the user via their device’s canvas. */
export const View = ({
  main,
  themeName = 'light',
  accentScheme = 'web',
  translations = defaultTranslations,
  iconSpriteUrl,
  onAction,
}: ViewProps) => (
  <FluentBlocksProvider
    {...{
      themeName,
      accentScheme,
      translations,
      onAction,
      iconSpriteUrl,
    }}
  >
    <Main {...main} />
  </FluentBlocksProvider>
)
