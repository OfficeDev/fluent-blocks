import { LayoutProps } from './layout-properties'
import { FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequenceOrString } from '../../inlines'

export const Layout = ({
  theme,
  ...props
}: LayoutProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
    <Main
      blocks={[{ ...props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </FluentBlocksProvider>
)
