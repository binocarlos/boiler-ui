import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import ValueActions from '../../actions/value'
import ValueReducer from '../../reducers/value'


import Actions from './actions'
import Reducer from './reducer'
import Saga from './saga'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'name',
  'selector'
]

const SearchPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.name)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    actions,
    delay: settings.delay
  })

  return {
    actions,
    reducer,
    saga,
    selectors
  }
}

export default SearchPlugin