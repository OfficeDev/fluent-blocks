import { IllustrationProps } from './Illustration'
import { FluentPatternsProvider, Theme } from '../../lib'
import { Main } from '../../surfaces'

export const Illustration = ({
  theme,
  ...props
}: IllustrationProps & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
