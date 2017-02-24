/*

  getRouteActions(state, initial) => [action]

  look at the route (plus initial flag) and decide
  what actions to emit for that route

*/
import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork, select, take  } from 'redux-saga/effects'

import routerActions from '../actions/router'

const ROUTER_CHANGED = routerActions.types.changed

const REQUIRED_SETTINGS = [
  'getRouteActions',
  'userLoadedActionType'
]

const RouteTriggerSaga = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const getRouteActions = settings.getRouteActions
  const logger = Logger('saga : routetrigger')

  // actions triggered when the user data is refreshed
  function* processInitialTriggers() {
    const state = yield select(state => state)
    const routeActions = getRouteActions(state, true)
    yield routeActions.map(action => put(action))
  }

  function* processRouteChange() {
    const state = yield select(state => state)
    const routeActions = getRouteActions(state, false)
    yield routeActions.map(action => put(action))
  }

  function* root() {
    yield [
      takeLatest(ROUTER_CHANGED, processRouteChange),
      takeLatest(settings.userLoadedActionType, processInitialTriggers)
    ]
  }

  return root
}

export default RouteTriggerSaga