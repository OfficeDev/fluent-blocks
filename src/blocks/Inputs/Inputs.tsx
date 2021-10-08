import { z } from 'zod'
import { ReactElement } from 'react'
import { Placeholder, propsElementUnion } from '../../lib'
import {
  multilineTextInputProps,
  shortTextInputProps,
} from '../../inputs/text-input'
import { radioGroupProps } from '../../inputs/radio-group'

export const inputsProps = z.object({
  inputs: z.union([
    z.array(shortTextInputProps).min(1),
    multilineTextInputProps,
    radioGroupProps,
  ]),
})
export type InputsProps = z.infer<typeof inputsProps>

export const Inputs = (props: InputsProps) => (
  <Placeholder {...props} label="Inputs block placeholder" />
)

function isInputsProps(o: any): o is InputsProps {
  return 'inputs' in o
}

function isInputsElement(
  o: any
): o is ReactElement<InputsProps, typeof Inputs> {
  return o?.type === Inputs
}

export const inputsPropsOrElement = propsElementUnion<
  typeof inputsProps,
  InputsProps,
  typeof Inputs
>(inputsProps)
export type InputsPropsOrElement = z.infer<typeof inputsPropsOrElement>

export function renderIfInputs(o: any) {
  return isInputsProps(o) ? <Inputs {...o} /> : isInputsElement(o) ? o : null
}
