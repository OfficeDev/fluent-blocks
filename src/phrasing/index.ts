import { z } from 'zod'
import { textProps } from './text/Text'
import { iconProps } from './icon/Icon'

export const phrasingContentProps = z.array(z.union([textProps, iconProps]))
export type PhrasingContentProps = z.infer<typeof phrasingContentProps>
