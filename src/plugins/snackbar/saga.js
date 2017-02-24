import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'actions',
  'triggers'
]

const SnackbarPluginSaga = (settings = {}) => {
  const actions = settings.actions
  const triggers = settings.triggers

  const sagas = [

    // listen for any system mutations and display a snackbar
    function* listenForMutation() {
      function* openSnackbar(action) {
        yield put(actions.open(action.payload))
      }
      yield takeLatest(triggers, openSnackbar)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default SnackbarPluginSaga