import { BigMessageProps } from './BigMessage'
import { FluentPatternsProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const BigMessage = ({
  theme,
  ...props
}: BigMessageProps['message'] & { theme: ThemeName }) => (
  <FluentPatternsProvider themeName={theme}>
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentPatternsProvider>
)
