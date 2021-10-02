import { z } from 'zod'
import { ReactElement } from 'react'
import { Placeholder, propsElementUnion } from '../lib'
import {
  multilineTextInputProps,
  shortTextInputProps,
} from '../inputs/text-input'
import { radioGroupProps } from '../inputs/radio-group'

export const inputsProps = z.object({
  inputs: z.union([
    z.array(shortTextInputProps).min(1),
    multilineTextInputProps,
    radioGroupProps,
  ]),
})
export type InputsProps = z.infer<typeof inputsProps>

export const Inputs = (props: InputsProps) => (
  <Placeholder {...inputsProps.parse(props)} label="Inputs block" />
)

function isInputsProps(p: any): p is InputsProps {
  return 'inputs' in p
}

function isInputsElement(
  p: any
): p is ReactElement<InputsProps, typeof Inputs> {
  return p?.type === Inputs
}

export const inputsPropsOrElement = propsElementUnion<
  typeof inputsProps,
  InputsProps,
  typeof Inputs
>(inputsProps)
export type InputsPropsOrElement = z.infer<typeof inputsPropsOrElement>

export function renderIfInputs(p: any) {
  return isInputsProps(p) ? <Inputs {...p} /> : isInputsElement(p) ? p : null
}
