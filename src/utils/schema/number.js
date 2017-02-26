import deepCheck from 'deep-check-error'
import pluralize from 'pluralize'

import TextFilter from './textfilter'

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

  const required = settings.required

  return TextFilter(Object.assign({}, settings, {
    filter: parseFloat,
    validate: (value = 0, data = {}) => {
      if(required && value == 0) return 'number required'
      if(!value.toString().match(/^-?\d+(\.\d+)?$/)) return 'number required'
      return null
    }
  }))
}

export default num