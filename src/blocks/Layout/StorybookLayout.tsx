import { LayoutProps } from './Layout'
import { FluentPatternsProvider, Theme } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequenceOrString } from '../../inlines'

export const Layout = ({
  theme,
  ...props
}: LayoutProps['layout'] & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main
      blocks={[{ layout: props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </FluentPatternsProvider>
)
