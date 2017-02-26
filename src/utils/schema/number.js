import deepCheck from 'deep-check-error'
import pluralize from 'pluralize'

import {
  getPathnameValue,
  setPathnameValue,
  processNumber
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const num = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  const name = settings.name
  const required = settings.required
  const validate = settings.validate
  const initialValue = settings.initialValue || 0

  const setValue = setPathnameValue(name)

  return {
    name: name,
    get: getPathnameValue(name),
    set: (value, data) => {
      return setValue(processNumber(value), data)
    },
    getInitial: () => initialValue,
    validate: (value = 0, data = {}) => {
      if(required && value == 0) return 'number required'
      if(!value.toString().match(/^-?\d+(\.\d+)?$/)) return 'number required'
      return null
    }
  }
}

export default num