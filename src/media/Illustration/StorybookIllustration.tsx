import {
  Illustration as NaturalIllustration,
  IllustrationProps,
} from './Illustration'
import { FluentPatternsProvider, Theme } from '../../lib'
import { Main } from '../../surfaces'
import { InlineSequence } from '../../inlines'

export const Illustration = ({
  theme,
  ...props
}: IllustrationProps & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={null as unknown as InlineSequence}
    />
  </FluentPatternsProvider>
)
