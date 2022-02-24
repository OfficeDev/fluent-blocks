import { IllustrationProps } from './Illustration'
import { FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Illustration = ({
  theme,
  ...props
}: IllustrationProps & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
