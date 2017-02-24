import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork, select, take  } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'handlers'
]

const DataTriggerSaga = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const handlers = settings.handlers
  const logger = Logger('saga : datatrigger')

  const triggerActions = Object.keys(handlers || {}).map(actionType => actionType)

  function* processTrigger(action) {
    const dataHandlers = handlers[action.type]
    if(!dataHandlers) return
    logger('running dataTriggers for: ' + action.type)
    const state = yield select(state => state)
    const actions = dataHandlers.reduce((all, handler) => all.concat(handler(state)), [])
    yield actions.map(action => put(action))
  }

  function* root() {
    yield takeLatest(triggerActions, processTrigger)
  }

  return root
}

export default DataTriggerSaga