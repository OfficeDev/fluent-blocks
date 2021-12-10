import { makeStyles } from '@fluentui/react-components'
import { rem } from './units'

export const useCommonStyles = makeStyles({
  mainContentWidth: {
    maxWidth: rem(600),
  },
  narrowWidth: {
    maxWidth: rem(280),
  },
  centerBlock: {
    marginInlineStart: 'auto',
    marginInlineEnd: 'auto',
  },
  baseSurface: (theme) => ({
    '--surface-background': theme.colorNeutralBackground3,
    '--surface-foreground': theme.colorNeutralForeground3,
    '--input-background': theme.colorNeutralBackground1,
    '--content-elevation': theme.shadow4,
  }),
  elevatedSurface: (theme) => ({
    '--surface-background': theme.colorNeutralBackground1,
    '--surface-foreground': theme.colorNeutralForeground1,
    '--input-background': theme.colorNeutralBackground3,
    '--content-elevation': 'none',
  }),
})

export const useTextBlockStyles = makeStyles({
  root: {
    lineHeight: 20 / 14,
    marginBlockStart: rem(4),
    marginBlockEnd: rem(4),
  },
  heading: (theme) => ({
    color: theme.colorNeutralForeground1, // always this, no matter what surface
    fontSize: 'inherit',
    fontWeight: 600,
    marginBlockStart: rem(24),
    lineHeight: 24 / 18,
  }),
  cardSpacing: {
    margin: 0,
  },
  h1: {
    fontSize: rem(24),
    lineHeight: 32 / 24,
  },
  h2: {
    fontSize: rem(20),
    lineHeight: 28 / 20,
  },
  h3: {
    fontSize: rem(16),
    lineHeight: 22 / 16,
  },
})

export const useTextStyles = makeStyles({
  code: (theme) => ({
    fontFamily: theme.fontFamilyMonospace,
    fontWeight: theme.fontWeightMedium,
    borderRadius: theme.borderRadiusMedium,
    boxShadow: 'var(--content-elevation)',
    backgroundColor: 'var(--input-background)',
    padding: '.1em .3em',
  }),
})
