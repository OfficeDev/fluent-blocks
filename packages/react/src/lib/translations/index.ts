import { useContext } from 'react'

import { Translations as NaturalTranslations } from '@fluent-blocks/schemas'

import { FluentBlocksContext } from '../Provider'
import enUS from './en-US'

export type Translations = NaturalTranslations

export const defaultTranslations = enUS

export const getTranslation = (
  translations: Translations,
  key: string
): string => (translations.hasOwnProperty(key) ? translations[key] : key)

export const useTranslations = () => {
  const translations = useContext(FluentBlocksContext).translations
  return (key: string): string => getTranslation(translations, key)
}
