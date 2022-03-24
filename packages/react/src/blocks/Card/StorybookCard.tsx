import range from 'lodash/range'

import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'

import { Main } from '../../surfaces'
import { CardProps } from './card-properties'

export const BlockCard = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: CardProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main blocks={[props]} title={[{ text: ' ' }]} />
  </FluentBlocksProvider>
)

export const LayoutCard = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: CardProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[
        {
          layout: {
            variant: 'grid',
            items: range(3).map((i) => ({ item: { ...props } })),
          },
        },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
