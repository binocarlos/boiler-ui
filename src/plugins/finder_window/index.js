import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import SearchPlugin from '../search'
import ListPlugin from '../list'

import Actions from './actions'
import Reducer from './reducer'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'name',
  'selector',
  'apis.list'
]

const FinderWindowPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const selector = settings.selector
  const apis = settings.apis

  const search = SearchPlugin({
    name: settings.name + '_SEARCH',
    delay: 300,
    selector: state => selector(state).search
  })

  const list = ListPlugin({
    name: settings.name + '_LIST',
    apis: apis,
    selector: state => selector(state).list
  })

  const actions = Actions(settings.name, search, list)
  const reducer = Reducer(actions, search, list)
  const selectors = Selectors(selector, search, list)

  return {
    actions,
    reducer,
    selectors,
    search,
    list
  }
}

export default FinderWindowPlugin