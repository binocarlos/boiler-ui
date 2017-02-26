import deepCheck from 'deep-check-error'
import pluralize from 'pluralize'

import {
  getPathnameValue,
  setPathnameValue
} from '../../tools'

// text schema that filters the incoming value and stashes the raw value with a '_raw' appendix

const REQUIRED_SETTINGS = [
  'name'
]

const defaultValidate = () => null

const num = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  const name = settings.name
  const validate = settings.validate || defaultValidate
  const initialValue = settings.initialValue || 0
  const filter = settings.filter

  const setRawValue = setPathnameValue(name + '_raw')
  const setFilteredValue = setPathnameValue(name)

  return {
    name: name,
    get: getPathnameValue(name + '_raw'),
    set: (value, data) => {
      const rawData = setRawValue(value, data)
      return setFilteredValue(filter(value), rawData)
    },
    getInitial: () => initialValue,
    validate
  }
}

export default num