import deepCheck from 'deep-check-error'
import pluralize from 'pluralize'

import {
  getPathnameValue,
  setPathnameValue,
  dateToSQL,
  sqlToDate
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const datefield = (settings = {}) => {
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
  const initialValue = settings.initialValue || new Date()

  const rawGet = getPathnameValue(name)
  const rawSet = setPathnameValue(name)

  return {
    name: name,
    // value is an SQL string - turn it into a Date
    get: (data) => sqlToDate(rawGet(data)),
    // value is a Date object - turn it into an SQL string
    set: (value, data) => rawSet(dateToSQL(value), data),
    getInitial: () => initialValue,
    validate: (value = '', data = {}) => null
  }
}

export default datefield