import { LayoutProps } from './layout-properties'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequenceOrString } from '../../inlines'

export const Layout = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: LayoutProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[{ ...props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </FluentBlocksProvider>
)
