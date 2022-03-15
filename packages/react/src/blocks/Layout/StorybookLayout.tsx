import { LayoutProps } from './layout-properties'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequenceOrString } from '../../inlines'

export const Layout = ({
  themeName,
  accentScheme,
  ...props
}: LayoutProps & { themeName: ThemeName; accentScheme: AccentScheme }) => (
  <FluentBlocksProvider {...{ themeName, accentScheme }}>
    <Main
      blocks={[{ ...props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </FluentBlocksProvider>
)
