/*

  we want to de-couple actions inside components that result
  in the route changing with the opinion about what actual route
  that should be

  buttons clicked in components can emit the 'ROUTER_REDIRECT' action
  the action has
   * base     - the action set (e.g. INSTALLATION_TABLE)
   * name     - the action itself (e.g. edit)
   * payload  - additional data (e.g. {id:10})



  redirectors passed here is an object of base -> type: (payload) => 

  {
    'INSTALLATION_TABLE': {
      edit: (payload) => [
        action1,
        action2
      ]
    }
  }
*/
import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork, select, take  } from 'redux-saga/effects'

import routerActions from '../actions/router'

const triggerAction = routerActions.types.redirect

const REQUIRED_SETTINGS = [
  'redirectors'
]

const RedirectorSaga = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const redirectors = settings.redirectors || {}
  const logger = Logger('saga : redirector')

  function* processRedirect(action) {

    const redirectorGroup = redirectors[action.base] || {}
    const handler = redirectorGroup[action.name]

    if(!handler) return

    const state = yield select(state => state)
    const redirectAction = handler(action.payload, state)

    if(!redirectAction) return

    logger(action.base + ' - ' + action.name, action.payload, redirectAction)

    if(redirectAction.constructor === Array) {
      yield redirectAction.map(action => put(action))
    }
    else{
      yield put(redirectAction)
    }
  }

  function* root() {
    yield [
      takeLatest(triggerAction, processRedirect)
    ]
  }

  return root
}

export default RedirectorSaga