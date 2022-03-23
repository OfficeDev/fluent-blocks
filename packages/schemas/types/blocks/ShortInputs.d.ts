import { ButtonProps, ShortTextInputProps } from '../inputs'

export type ShortInputEntity = ShortTextInputProps | ButtonProps

export type ShortInputSequence = ShortInputEntity[]

export interface ShortInputsProps {
  inputs: ShortInputSequence
  variant?: 'flex' | 'narrow-block'
}
