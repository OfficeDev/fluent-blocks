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
  'requiredAsterisk-hc': {
    marginInlineStart: '.125em',
    color: 'var(--colorCompoundBrandForeground1)',
  },
  optionalInParens: {
    marginInlineStart: '.25em',
    color: 'var(--colorNeutralForeground3)',
  },
  'optionalInParens-hc': {
    marginInlineStart: '.25em',
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
  const { translations, requiredVariant, themeName } = useFluentBlocksContext()
  return (
    <>
      <InlineContent inlines={label} />
      {requiredVariant === 'requiredAsterisk' && required && (
        <span
          className={
            inputLabelContentStyles[
              themeName === 'highContrast'
                ? 'requiredAsterisk-hc'
                : 'requiredAsterisk'
            ]
          }
        >
          {translations['requiredAsterisk']}
        </span>
      )}
      {requiredVariant === 'optionalInParens' && !required && (
        <span
          className={
            inputLabelContentStyles[
              themeName === 'highContrast'
                ? 'optionalInParens-hc'
                : 'optionalInParens'
            ]
          }
        >
          {translations['optionalInParens']}
        </span>
      )}
    </>
  )
}
