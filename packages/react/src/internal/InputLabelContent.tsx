import { InputRequiredProps } from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'

import { InlineContent } from '../inlines'
import { useFluentBlocksContext } from '../lib'
import { InputProps } from '../props'

const useInputLabelContentStyles = makeStyles({
  requiredAsterisk: {
    marginInlineStart: '.125em',
    color: 'var(--colorPaletteRedForeground1)',
  },
  optionalInParens: {
    marginInlineStart: '.25em',
    color: 'var(--colorNeutralForeground3)',
  },
})

interface InputLabelContentProps extends InputRequiredProps {
  label: InputProps['label']
}

export const InputLabelContent = ({
  label,
  required,
}: InputLabelContentProps) => {
  const inputLabelContentStyles = useInputLabelContentStyles()
  const { translations, requiredVariant } = useFluentBlocksContext()
  return (
    <>
      <InlineContent inlines={label} />
      {requiredVariant === 'requiredAsterisk' && required && (
        <span className={inputLabelContentStyles.requiredAsterisk}>
          {translations['requiredAsterisk']}
        </span>
      )}
      {requiredVariant === 'optionalInParens' && !required && (
        <span className={inputLabelContentStyles.optionalInParens}>
          {translations['optionalInParens']}
        </span>
      )}
    </>
  )
}
