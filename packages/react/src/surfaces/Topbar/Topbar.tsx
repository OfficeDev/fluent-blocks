import { TopbarProps as NaturalTopbarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Toolbar } from '../../blocks/Toolbar/Toolbar'
import { sx, useCommonStyles } from '../../lib'
import { ContextualViewStateProps } from '../../props'

export interface TopbarProps
  extends NaturalTopbarProps,
    ContextualViewStateProps {}

const useTopbarStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  gap: {
    ...sx.flex(1, 0, '0'),
  },
})

export const Topbar = ({ near, far }: TopbarProps) => {
  const topbarStyles = useTopbarStyles()
  const commonStyles = useCommonStyles()
  console.log('[topbar]', near)
  return (
    <div className={cx(topbarStyles.root, commonStyles.elevatedSurface)}>
      {near?.menu ? (
        <Toolbar toolbar={{ menu: near.menu }} />
      ) : (
        <div role="none" className={topbarStyles.gap} />
      )}
    </div>
  )
}
