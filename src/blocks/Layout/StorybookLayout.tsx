import { LayoutProps } from './Layout'
import { FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequenceOrString } from '../../inlines'

export const Layout = ({
  theme,
  ...props
}: LayoutProps['layout'] & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main
      blocks={[{ layout: props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </FluentPatternsProvider>
)
