import { IllustrationProps } from './Illustration'
import { FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Illustration = ({
  theme,
  ...props
}: IllustrationProps & { theme: ThemeName }) => (
  <FluentBlocksProvider themeName={theme}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
