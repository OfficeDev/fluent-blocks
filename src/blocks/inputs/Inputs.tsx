import { z } from 'zod'
import { Placeholder } from '../../lib/Placeholder'
import { PropsWithPath } from '../../lib/types'
import { multilineTextInputProps, shortTextInputProps } from '../../fragments/inputs/text-input'
import { radioGroupProps } from '../../fragments/inputs/radio-group'

export const inputsProps = z.object({
  inputs: z.union([z.array(shortTextInputProps).min(1), multilineTextInputProps, radioGroupProps]),
})

export type InputsProps = z.infer<typeof inputsProps>

export const Inputs = (props: PropsWithPath<InputsProps>) => <Placeholder {...inputsProps.parse(props)} label="Inputs block" />
