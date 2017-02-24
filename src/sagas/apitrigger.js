/*

  a trigger saga that listens for the submit action of a form



*/
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork, select  } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'trigger',
  'handler',
  'selectors.params',
  'selectors.data'
]

const ApiTriggerSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const trigger = settings.trigger
  const actionCreator = settings.handler
  const selectors = settings.selectors
  
  function* triggerApi(action) {
    const params = yield select(selectors.params)
    const data = yield select(selectors.data)
    yield put(actionCreator(params, data))
  }

  function* root() {
    yield takeLatest(trigger, triggerApi)
  }

  return root
}

export default ApiTriggerSagaFactory