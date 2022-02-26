import { BigMessageProps } from './BigMessage'
import { ActionHandler, FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const BigMessage = ({
  theme,
  onAction,
  ...props
}: BigMessageProps['message'] & {
  theme: ThemeName
  onAction: ActionHandler
}) => (
  <FluentPatternsProvider themeName={theme} onAction={onAction}>
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
