import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import Actions from './actions'
import Reducer from './reducer'
import Saga from './saga'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'name',
  'selector',
  'apis.list',
  'apis.delete'
]

const TablePlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.name)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    apis: settings.apis,
    actions,
    reloadTriggers: settings.reloadTriggers
  })

  return {
    actions,
    reducer,
    saga,
    selectors
  }
}

export default TablePlugin