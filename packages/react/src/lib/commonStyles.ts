import { makeStyles } from '@fluentui/react-components'

import { sx } from './shorthands'
import { rem } from './units'

export const useCommonStyles = makeStyles({
  mainContentWidth: {
    maxWidth: rem(572),
  },
  mainContentWidthEncapsulated: {
    maxWidth: rem(612),
  },
  narrowWidth: {
    maxWidth: rem(280),
  },
  centerBlock: {
    marginInlineStart: 'var(--content-margin-inline-start)',
    marginInlineEnd: 'var(--content-margin-inline-end)',
  },
  baseSurface: {
    '--surface-background': 'var(--colorNeutralBackground3)',
    '--surface-foreground': 'var(--colorNeutralForeground3)',
    '--input-background': 'var(--colorNeutralBackground1)',
    '--content-elevation': 'var(--shadow4)',
    '--content-margin-inline-start': 'auto',
    '--content-margin-inline-end': 'auto',
  },
  elevatedSurface: {
    '--surface-background': 'var(--colorNeutralBackground1)',
    '--surface-foreground': 'var(--colorNeutralForeground1)',
    '--input-background': 'var(--colorNeutralBackground3)',
    '--content-elevation': 'none',
    '--content-margin-inline-start': 0,
    '--content-margin-inline-end': 0,
  },
  visuallyHidden: {
    clipPath: 'inset(100%)',
    clip: 'rect(1px, 1px, 1px, 1px)',
    height: '1px',
    ...sx.overflow('hidden'),
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  blockSpacing: {
    marginBlockStart: '0',
    marginBlockEnd: '1rem',
  },
})

export const useTextBlockStyles = makeStyles({
  root: {
    lineHeight: 20 / 14,
    marginBlockStart: 0,
    marginBlockEnd: rem(8),
  },
  code: {
    ...sx.padding('.5rem', '1rem'),
  },
  heading: {
    color: 'var(--colorNeutralForeground1)', // always this, no matter what surface
    fontSize: 'inherit',
    fontWeight: 600,
    marginBlockStart: rem(24),
    lineHeight: 24 / 18,
  },
  cardSpacing: {
    marginInlineStart: 0,
    marginInlineEnd: 0,
    marginBlockStart: 0,
  },
  inputMetaSpacing: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  radioMetaSpacing: {
    marginBlockStart: rem(-4),
    marginBlockEnd: rem(4),
    marginInlineEnd: 0,
    marginInlineStart: rem(36),
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
  code: {
    fontFamily: 'var(--fontFamilyMonospace)',
    fontWeight: 'var(--fontWeightMedium)',
    ...sx.borderRadius('var(--borderRadiusMedium)'),
    boxShadow: 'var(--content-elevation)',
    backgroundColor: 'var(--input-background)',
    ...sx.padding('.1em', '.3em'),
  },
  described: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  inputMeta: {},
})
