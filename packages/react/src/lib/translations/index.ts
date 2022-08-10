import { useContext } from 'react'

import { Dir } from '@fluent-blocks/schemas'

import { FluentBlocksContext } from '../Provider'
import enUS from './en-US'

export type Translations = Record<keyof typeof enUS, string> & {
  dir: Dir
  locale: string
}

export const defaultTranslations = enUS

export const getTranslation = (
  translations: Translations,
  key: keyof Translations
): string => (translations.hasOwnProperty(key) ? translations[key] : key)

export const useTranslations = () => {
  const translations = useContext(FluentBlocksContext).translations
  return (key: keyof Translations): string => getTranslation(translations, key)
}
