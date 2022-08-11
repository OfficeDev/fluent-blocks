import { SectionProps } from '../blocks'
import { AccentScheme, ThemeName } from '../lib/themes'
import { Translations } from '../lib/translations'
import { SidebarProps, TopbarProps } from '../surfaces'

export interface ViewMetaProps {
  translations?: Translations
  themeName?: ThemeName
  accentScheme?: AccentScheme
  requiredVariant?: 'requiredAsterisk' | 'optionalInParens'
}

export interface ViewProps extends ViewMetaProps {
  main: SectionProps
  topbar?: TopbarProps
  sidebar?: SidebarProps
}
