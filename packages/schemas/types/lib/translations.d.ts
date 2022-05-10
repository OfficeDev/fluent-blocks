export type Dir = 'ltr' | 'rtl'

export type Translations = {
  dir: Dir
  locale: string
  [key: string]: string
}
