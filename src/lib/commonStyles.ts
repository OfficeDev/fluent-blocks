import { makeStyles } from '@fluentui/react-components'
import { rem } from './units'

export const useCommonStyles = makeStyles({
  mainContentWidth: {
    maxWidth: rem(432),
  },
  centerBlock: {
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
  },
})
