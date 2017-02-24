import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import SearchPlugin from 'boiler-ui/lib/plugins/search'
import ListPlugin from 'boiler-ui/lib/plugins/list'

import apis from '../../apis'

import Actions from './actions'
import Reducer from './reducer'
import Selectors from './selectors'

const REQUIRED_SETTINGS = [
  'name',
  'selector'
]

const ResourceFinderPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const selector = settings.selector

  const search = SearchPlugin({
    name: settings.name + '_SEARCH',
    delay: 300,
    selector: state => selector(state).search
  })

  const list = ListPlugin({
    name: settings.name + '_LIST',
    apis: {
      list: (query) => {

        const libraryMode = query.state.resource.finder.library.value || 'user'

        const handler = libraryMode == 'user' ?
          apis.userresource.children :
          apis.systemresource.children

        if(!query.params.search) {
          return new Promise((resolve) => resolve([]))
        }

        return handler(query)
      }
    },
    selector: state => selector(state).list
  })

  const actions = Actions(settings.name, search, list)
  const reducer = Reducer(actions, search, list)
  const selectors = Selectors(settings.selector, search, list)

  return {
    actions,
    reducer,
    selectors,
    search,
    list
  }
}

export default ResourceFinderPlugin