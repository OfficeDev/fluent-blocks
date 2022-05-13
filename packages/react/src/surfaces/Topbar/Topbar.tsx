import { TopbarProps as NaturalTopbarProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { Toolbar } from '../../blocks/Toolbar/Toolbar'
import { rem, sx, useCommonStyles, useFluentBlocksContext } from '../../lib'
import { ContextualViewStateProps } from '../../props'

export interface TopbarProps
  extends NaturalTopbarProps,
    ContextualViewStateProps {}

export const topbarHeight = 49

const useTopbarStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    boxShadow: 'var(--content-elevation)',
  },
  inner: {
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    ...sx.padding(rem(8)),
    borderBlockEndWidth: '1px',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'transparent',
    height: rem(topbarHeight),
    boxSizing: 'border-box',
  },
  'inner--hc': {
    borderBlockEndColor: 'var(--colorNeutralForeground1)',
  },
  gap: {
    ...sx.flex(1, 0, '0'),
  },
})

export const Topbar = ({ near, far }: TopbarProps) => {
  const topbarStyles = useTopbarStyles()
  const commonStyles = useCommonStyles()
  const { themeName } = useFluentBlocksContext()
  return (
    <div className={cx(topbarStyles.root)}>
      <div
        className={cx(
          topbarStyles.inner,
          commonStyles.elevatedSurface,
          themeName === 'highContrast' && topbarStyles['inner--hc']
        )}
      >
        {near?.menu ? (
          <Toolbar toolbar={{ menu: near.menu }} />
        ) : (
          <div role="none" className={topbarStyles.gap} />
        )}
      </div>
    </div>
  )
}
