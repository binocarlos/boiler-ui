import deepCheck from 'deep-check-error'

import { takeLatest, takeEvery } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'
import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'actions.list',
  'apis.list'
]

const ListSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const apis = settings.apis
  const reloadTriggers = settings.reloadTriggers || []

  const sagas = [

    // GET /api/v1/installations
    ApiSaga({
      api: apis.list,
      actions: actions.list
    }),

    function* listenForReloads() {
      function* reloadTable(action) {
        yield put(actions.reload.trigger())
      }
      yield takeEvery(reloadTriggers, reloadTable)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default ListSaga