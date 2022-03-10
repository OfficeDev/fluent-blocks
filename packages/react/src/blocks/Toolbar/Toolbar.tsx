import {
  toolbarProps as naturalToolbarProps,
  toolbarDivider,
  toolbarAction as naturalToolbarAction,
} from '@fluentui/blocks-schemas'
import { buttonProps } from '../../inputs'
import { z } from 'zod'

export const toolbarAction = naturalToolbarAction.merge(
  buttonProps.omit({
    variant: true,
    size: true,
    iconSize: true,
    contextualVariant: true,
  })
)

export const toolbarItemEntity = z.union([toolbarAction, toolbarDivider])

export const toolbarItemSequence = z.array(toolbarItemEntity)

export const toolbarProps = naturalToolbarProps.merge(
  z.object({
    toolbar: z.object({
      items: toolbarItemSequence,
    }),
  })
)

export type ToolbarProps = z.infer<typeof toolbarProps>

export const Toolbar = ({ toolbar: { items } }: ToolbarProps) => (
  <div>Toolbar</div>
)
