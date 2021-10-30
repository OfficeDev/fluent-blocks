import { z } from 'zod'
import { Button, makeStyles } from '@fluentui/react-components'
import { rem } from '../../lib'

export const action = z.object({
  label: z.string(),
})

export type Action = z.infer<typeof action>

export function isAction(o: any): o is Action {
  return !!o && typeof o == 'object' && 'label' in o
}

export const actionsBlockProps = z.object({
  primary: action.optional(),
  secondary: action.optional(),
  tertiary: action.optional(),
})

export type ActionsBlockProps = z.infer<typeof actionsBlockProps>

const useStyles = makeStyles({
  root: {
    maxWidth: rem(280),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: rem(20),
    marginBottom: rem(20),
    '& button': {
      marginTop: rem(4),
      marginBottom: rem(4),
    },
  },
})

export function ActionsBlock(props: ActionsBlockProps) {
  const { primary, secondary, tertiary } = props
  const styles = useStyles()
  return (
    <div className={styles.root}>
      {isAction(primary) && (
        <Button block primary>
          {primary.label}
        </Button>
      )}
      {isAction(secondary) && <Button block>{secondary.label}</Button>}
      {isAction(tertiary) && (
        <Button block transparent>
          {tertiary.label}
        </Button>
      )}
    </div>
  )
}
