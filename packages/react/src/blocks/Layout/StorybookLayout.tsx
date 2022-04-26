import { InlineSequenceOrString } from '../../inlines'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { LayoutProps } from '../../props'
import { Main } from '../../surfaces'

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
