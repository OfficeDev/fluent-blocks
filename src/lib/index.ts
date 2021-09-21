import concat from 'lodash/concat'

export const rem = (px: number): string => `${px / 16}rem`

export const nextPath = (path: string[], ...args): string[] =>
  concat(path, args)

export const pathToKey = (path: string[], ...args): string =>
  nextPath(path, ...args).join(':')

export const nextPathAndKey = (path: string[], ...args): [string[], string] => {
  const resultPath = nextPath(path, ...args)
  return [resultPath, resultPath.join(':')]
}
