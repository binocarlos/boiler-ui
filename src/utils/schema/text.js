import deepCheck from 'deep-check-error'
import pluralize from 'pluralize'

import {
  getPathnameValue,
  setPathnameValue
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const text = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  const name = settings.name
  const required = settings.required
  const minLength = settings.minLength
  const validate = settings.validate
  const initialValue = settings.initialValue || ''

  return {
    name: name,
    get: getPathnameValue(name),
    set: setPathnameValue(name),
    getInitial: () => initialValue,
    validate: (value = '', data = {}) => {
      if(required && (!value || value.length<=0)) return 'required'
      if(minLength && (value || '').length < minLength) return 'must be at least ' + minLength + ' ' + pluralize('char', minLength)
      return validate ?
        validate(value, data) :
        null
    }
  }
}

export default text