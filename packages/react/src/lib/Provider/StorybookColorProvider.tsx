import { defaultContext } from '..'
import { Main } from '../../surfaces'
import fakeTitle from '../fakeTitle'
import iconSpriteUrl from '../storybookIconSpriteUrl'
import { FluentBlocksProvider } from './FluentBlocksProvider'

interface StorybookProviderProps {
  keyColor: string
}

export const StorybookColorProvider = ({
  keyColor,
}: StorybookProviderProps) => (
    <FluentBlocksProvider
      {...defaultContext}
      accentScheme={{ keyColor }}
      iconSpriteUrl={iconSpriteUrl}
    >
      <Main
        title="Color demonstration"
        blocks={[
          {
            inputs: [
              {
                type: 'action',
                actionId: 'primary',
                variant: 'primary',
                label: 'Primary',
              },
            ],
          },
        ]}
      />
    </FluentBlocksProvider>
  )
