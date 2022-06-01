import { SelectProps } from '../../props/select'
import {
  CheckboxGroupElement,
  renderIfCheckboxGroup,
} from './variants/CheckboxGroup/CheckboxGroup'
import {
  RadioGroupElement,
  renderIfRadioGroup,
} from './variants/RadioGroup/RadioGroup'

export type SelectElement = RadioGroupElement | CheckboxGroupElement

export type SelectPropsOrElement = SelectProps | SelectElement

export const renderIfSelect = (o: any) =>
  'select' in o ? renderIfRadioGroup(o) || renderIfCheckboxGroup(o) : null
