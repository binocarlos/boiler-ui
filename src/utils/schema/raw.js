import deepCheck from 'deep-check-error'

import {
  getPathnameValue,
  setPathnameValue
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const raw = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  const name = settings.name
  const required = settings.required
  const validate = settings.validate
  const initialValue = settings.initialValue || null

  return {
    name: name,
    get: settings.get || getPathnameValue(name),
    set: settings.set || setPathnameValue(name),
    getInitial: () => initialValue,
    validate: () => null
  }
}

export default raw