import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { ValidationProps, Validator } from '../props'

function bindValidator(
  validator?: Validator
): (value?: string) => ValidationProps | null {
  if (!validator)
    {return function noOpValidation(value?: string) {
      return null
    }}
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
      return (value?: string) => regexp.test(value || '')
          ? 'validMessage' in validator
            ? { valence: 'valid', message: validator.validMessage! }
            : { valence: 'pending', message: '' }
          : { valence: 'invalid', message: validator.invalidMessage }
  }
}

export const useValidation = (
  initialValue?: string,
  initialValidation?: ValidationProps,
  validator?: Validator
): [string, Dispatch<SetStateAction<string>>, ValidationProps | null] => {
  const validatorFn = bindValidator(validator)

  const [hasMounted, setHasMounted] = useState(false)
  const [value, setValue] = useState(initialValue || '')
  const [validation, setValidation] = useState<ValidationProps | null>(
    initialValidation || (validator ? validatorFn(value) : null)
  )

  useEffect(() => {
    hasMounted ? setValidation(validatorFn(value)) : setHasMounted(true)
  }, [value])

  return [value, setValue, validation]
}
