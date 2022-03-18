import { IllustrationProps } from './Illustration'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Illustration = ({
  themeName,
  accentScheme,
  basicSpriteUrl,
  ...props
}: IllustrationProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  basicSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, basicSpriteUrl }}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
