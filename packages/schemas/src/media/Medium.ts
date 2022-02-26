import { z } from 'zod'
import { themedImageProps } from './ThemedImage'
import { chartProps } from './Chart'
import { illustrationProps } from './Illustration'
import { codeProps } from './Code'

export const mediaEntity = z.union([
  illustrationProps,
  chartProps,
  codeProps,
  themedImageProps,
])
