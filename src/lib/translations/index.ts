import { z } from 'zod'
import { useContext } from 'react'

import { FluentPatternsContext } from '../FluentPatternsContext'

import enUS from './en-US'

export const dir = z.union([z.literal('ltr'), z.literal('rtl')])

export type Dir = z.infer<typeof dir>

export const translations = z
  .object({
    dir,
    locale: z.string().regex(/^[^-]{2,3}-[^-]{2,3}(-[^-]{2,3})?$/),
  })
  .catchall(z.string())

export type Translations = z.infer<typeof translations>

export const defaultTranslations = enUS

export const getTranslation = (
  translations: Translations,
  key: string
): string => (translations.hasOwnProperty(key) ? translations[key] : key)

export const useTranslations = () => {
  const translations = useContext(FluentPatternsContext).translations
  return (key: string): string => getTranslation(translations, key)
}
