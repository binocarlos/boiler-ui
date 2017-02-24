import React from 'react'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { RouterProvider } from 'redux-little-router'
import { fork } from 'redux-saga/effects'
import bows from 'bows'
import deepCheck from 'deep-check-error'

import Store from './store'

import {
  getFunctionName
} from './tools'

const REQUIRED_SETTINGS = [
  'reducer',
  'routes',
  'sagas'
]

const boilerapp = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const reducer = settings.reducer
  const routes = settings.routes
  const basepath = settings.basepath
  const sagas = settings.sagas.reduce((all, saga) => {
    return saga.constructor == Array ?
      all.concat(saga) :
      all.concat([saga])
  }, [])
  const middleware = settings.middleware || []
  const initialState = settings.initialState

  const store = Store({
    reducer,
    routes,
    middleware,
    initialState
  })
  const initialLocation = store.getState().router

  function *rootSaga() {
    yield sagas.map(fork)
  }
  store.runSaga(rootSaga)

  return (content) => {
    return (
      <Provider store={store}>
        <RouterProvider store={store}>
          {content}
        </RouterProvider>
      </Provider>
    )
  }
}

export default boilerapp