import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import Actions from './actions'
import Reducer from './reducer'
import Saga from './saga'
import Selectors from './selectors'
import Container from './Container'

const REQUIRED_SETTINGS = [
  'base',
  'selector',
  'triggers'
]

const SnackbarPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const triggers = settings.triggers
  const actions = Actions(settings.base)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    actions,
    triggers
  })

  const getContainer = () => {
    const containerProps = Object.assign({}, settings, {
      selectors,
      actions
    })
    return (
      <Container {...containerProps} />
    )
  }

  return {
    actions,
    reducer,
    saga,
    selectors,
    getContainer
  }
}

export default SnackbarPlugin