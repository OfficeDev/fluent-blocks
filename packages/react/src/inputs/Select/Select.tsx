import { ReactElement } from 'react'

import {
  Label,
  mergeClasses as cx,
  makeStyles,
} from '@fluentui/react-components'

import { Paragraph } from '../../blocks'
import { InlineContent } from '../../inlines'
import {
  makeId,
  useCommonStyles,
  useShortInputStyles,
  useTextBlockStyles,
} from '../../lib'
import { SelectProps } from '../../props'
import { renderIfCheckboxGroup } from './variants/CheckboxGroup/CheckboxGroup'
import { renderIfCombobox } from './variants/Combobox/Combobox'
import { renderIfDropdown } from './variants/Dropdown/Dropdown'
import { renderIfRadioGroup } from './variants/RadioGroup/RadioGroup'

const useSelectStyles = makeStyles({
  root: {
    marginBlockStart: '.5rem',
    marginBlockEnd: '1rem',
  },
  label: {
    display: 'block',
  },
  input: {
    marginBlockStart: '.25rem',
  },
})

export const Select = (o: SelectProps) => {
  const commonStyles = useCommonStyles()
  const shortInputStyles = useShortInputStyles()
  const textBlockStyles = useTextBlockStyles()
  const selectStyles = useSelectStyles()

  const {
    select: { actionId, label, description, descriptionVariant },
  } = o

  const labelId = makeId(actionId, 'label')
  const descriptionId = makeId(actionId, 'description')

  const extendedSelectProps = {
    ...o,
    contextualLabelId: labelId,
    contextualDescriptionId: descriptionId,
  }

  return (
    <div
      role="none"
      className={cx(
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        selectStyles.root,
        extendedSelectProps.select.variant === 'combobox' &&
          shortInputStyles.root
      )}
    >
      <Label
        id={labelId}
        className={cx(selectStyles.label, textBlockStyles.inputMetaSpacing)}
      >
        <InlineContent inlines={label} />
      </Label>
      {description && (
        <Paragraph
          paragraph={description}
          contextualId={descriptionId}
          visuallyHidden={descriptionVariant === 'visuallyHidden'}
          contextualVariant="inputMeta"
        />
      )}
      <div role="none" className={selectStyles.input}>
        {renderIfRadioGroup(extendedSelectProps) ||
          renderIfCheckboxGroup(extendedSelectProps) ||
          renderIfDropdown(extendedSelectProps) ||
          renderIfCombobox(extendedSelectProps)}
      </div>
    </div>
  )
}

export type SelectElement = ReactElement<SelectProps, typeof Select>
export type SelectPropsOrElement = SelectProps | SelectElement

function isSelectProps(o: any): o is SelectProps {
  return 'select' in o
}

function isSelectElement(o: any): o is SelectElement {
  return o?.type === Select
}

export function renderIfSelect(o: any) {
  return isSelectProps(o) ? <Select {...o} /> : isSelectElement(o) ? o : null
}
