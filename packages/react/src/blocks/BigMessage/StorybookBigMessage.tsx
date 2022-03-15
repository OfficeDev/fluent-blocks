import { BigMessageProps } from './BigMessage'
import { ActionHandler, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const BigMessage = ({
  theme,
  onAction,
  ...props
}: BigMessageProps['message'] & {
  theme: ThemeName
  onAction: ActionHandler
}) => (
  <FluentBlocksProvider themeName={theme} onAction={onAction}>
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
