import { BigMessageProps } from './BigMessage'
import { FluentPatternsProvider, Theme } from '../../lib'
import { Main } from '../../surfaces'

export const BigMessage = ({
  theme,
  ...props
}: BigMessageProps['message'] & { theme: Theme }) => (
  <FluentPatternsProvider theme={theme}>
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
