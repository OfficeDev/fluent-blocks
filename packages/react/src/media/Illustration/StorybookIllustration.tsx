import { IllustrationProps } from './Illustration'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Illustration = ({
  themeName,
  accentScheme,
  ...props
}: IllustrationProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme }}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
