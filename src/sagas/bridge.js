/*

  a trigger saga that listens for the submit action of a form



*/
import deepCheck from 'deep-check-error'
import { takeLatest, takeEvery } from 'redux-saga'
import { put, call, fork, select  } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'trigger',
  'sink'
]

// processAction turns the incoming action object
// into an array of parameters to be passed to the 'sink'
// the sink is an action creator
const BridgeSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const trigger = settings.trigger
  const sink = settings.sink
  const processAction = settings.processAction
  
  function* handleAction(action) {
    yield put(sink(action))
  }

  function* root() {
    yield takeEvery(trigger, handleAction)
  }

  return root
}

export default BridgeSagaFactory