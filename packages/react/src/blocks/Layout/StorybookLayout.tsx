import { LayoutProps } from './layout-properties'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequenceOrString } from '../../inlines'

export const Layout = ({
  themeName,
  accentScheme,
  basicSpriteUrl,
  ...props
}: LayoutProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  basicSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, basicSpriteUrl }}>
    <Main
      blocks={[{ ...props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </FluentBlocksProvider>
)
