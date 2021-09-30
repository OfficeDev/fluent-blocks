import { z } from 'zod'
import { Placeholder } from '../lib/Placeholder'
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

export function isInputs(o: any): o is InputsProps {
  return 'inputs' in o
}

export const Inputs = (props: InputsProps) => (
  <Placeholder {...inputsProps.parse(props)} label="Inputs block" />
)
