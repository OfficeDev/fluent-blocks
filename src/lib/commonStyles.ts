import { makeStyles } from '@fluentui/react-components'
import { rem } from './units'

export const useCommonStyles = makeStyles({
  mainContentWidth: {
    maxWidth: rem(572),
  },
  narrowWidth: {
    maxWidth: rem(280),
  },
  centerBlock: {
    marginInlineStart: 'var(--content-margin-inline-start)',
    marginInlineEnd: 'var(--content-margin-inline-end)',
  },
  baseSurface: (theme) => ({
    '--surface-background': theme.colorNeutralBackground3,
    '--surface-foreground': theme.colorNeutralForeground3,
    '--input-background': theme.colorNeutralBackground1,
    '--content-elevation': theme.shadow4,
    '--content-margin-inline-start': 'auto',
    '--content-margin-inline-end': 'auto',
  }),
  elevatedSurface: (theme) => ({
    '--surface-background': theme.colorNeutralBackground1,
    '--surface-foreground': theme.colorNeutralForeground1,
    '--input-background': theme.colorNeutralBackground3,
    '--content-elevation': 'none',
    '--content-margin-inline-start': 0,
    '--content-margin-inline-end': 0,
  }),
  visuallyHidden: {
    clipPath: 'inset(100%)',
    clip: 'rect(1px, 1px, 1px, 1px)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
})

export const useTextBlockStyles = makeStyles({
  root: {
    lineHeight: 20 / 14,
    marginBlockStart: rem(4),
    marginBlockEnd: rem(8),
  },
  code: {
    padding: '.5rem 1rem',
  },
  heading: (theme) => ({
    color: theme.colorNeutralForeground1, // always this, no matter what surface
    fontSize: 'inherit',
    fontWeight: 600,
    marginBlockStart: rem(24),
    lineHeight: 24 / 18,
  }),
  cardSpacing: {
    marginBlockStart: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    marginBlockEnd: rem(12),
    '&:last-child': { marginBlockEnd: 0 },
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
