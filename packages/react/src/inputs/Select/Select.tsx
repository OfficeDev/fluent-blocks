import { SelectProps } from '../../props/select'
import {
  RadioGroupElement,
  renderIfRadioGroup,
} from './variants/RadioGroup/RadioGroup'

export type SelectElement = RadioGroupElement

export type SelectPropsOrElement = SelectProps | SelectElement

export const renderIfSelect = (o: any) =>
  'select' in o
    ? renderIfRadioGroup(o)
    : /* || etc */
      null
