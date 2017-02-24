import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import Actions from './actions'
import Reducer from './reducer'
import Saga from './saga'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'name',
  'selector',
  'getSchema',
  'getTitle',
  'apis.get',
  'apis.put',
  'apis.post'
]

const FormPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.name)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    getSchema: settings.getSchema,
    getTitle: settings.getTitle,
    apis: settings.apis,
    actions,
    selectors
  })

  return {
    actions,
    reducer,
    saga,
    selectors
  }
}

export default FormPlugin