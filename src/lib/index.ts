import concat from 'lodash/concat'

export const rem = (px: number): string => `${px / 16}rem`

export const pathToKey = (path: string[], ...args): string => concat(path, args).join(':')

export const nextPathAndKey = (path: string[], ...args): [string[], string] => {
  const nextPath = concat(path, args)
  return [nextPath, nextPath.join(':')]
}
