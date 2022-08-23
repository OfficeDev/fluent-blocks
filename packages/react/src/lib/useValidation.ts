import isFunction from 'lodash/isFunction'
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { ValidationProps, Validator } from '../props'

function bindValidator(
  validator?: Validator
): (value?: string) => ValidationProps | null {
  if (!validator) {
    return function noOpValidation(_value?: string) {
      return null
    }
  }
  if (isFunction(validator)) {
    return validator
  }
  switch (validator.validator) {
    case 'length':
      return (value?: string) => {
        const length = value ? value.length : 0
        if ('min' in validator && length < validator.min!) {
          return { valence: 'invalid', message: validator.invalidMessage }
        }
        if ('max' in validator && length > validator.max!) {
          return { valence: 'invalid', message: validator.invalidMessage }
        }
        return 'validMessage' in validator
          ? { valence: 'valid', message: validator.validMessage! }
          : { valence: 'pending', message: '' }
      }
    case 'regexp':
      const regexp = new RegExp(validator.regexp)
      return (value?: string) =>
        regexp.test(value || '')
          ? 'validMessage' in validator
            ? { valence: 'valid', message: validator.validMessage! }
            : { valence: 'pending', message: '' }
          : { valence: 'invalid', message: validator.invalidMessage }
  }
}

export const useValidation = (
  didMount: MutableRefObject<boolean>,
  initialValue?: string,
  initialValidation?: ValidationProps,
  validator?: Validator
): [string, Dispatch<SetStateAction<string>>, ValidationProps | null] => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validatorFn = useCallback(bindValidator(validator), [validator])

  const [value, setValue] = useState(initialValue || '')
  const [validation, setValidation] = useState<ValidationProps | null>(
    initialValidation || (validator ? validatorFn(value) : null)
  )

  useEffect(() => {
    didMount.current && setValidation(validatorFn(value))
  }, [didMount, validatorFn, value])

  return [value, setValue, validation]
}
