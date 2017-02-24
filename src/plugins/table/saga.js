import deepCheck from 'deep-check-error'

import { takeLatest, takeEvery } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'
import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'actions.list',
  'actions.delete',
  'actions.reload',
  'apis.list',
  'apis.delete'
]

const TableSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getSchema = settings.getSchema
  
  const actions = settings.actions
  const apis = settings.apis
  const reloadTriggers = settings.reloadTriggers || []

  const sagas = [

    // GET /api/v1/installations
    ApiSaga({
      api: apis.list,
      actions: actions.list
    }),

    // DELETE /api/v1/installations
    ApiSaga({
      api: apis.delete,
      actions: actions.delete
    }),

    function* listenForDeleteSuccess() {
      function* reloadList(action) {
        yield put(systemActions.mutation({
          message: action.query.message + ' deleted'
        }))
        yield put(actions.selection.set([]))
        yield put(actions.deleteWindow.close())
        yield put(actions.reload.trigger())
      }

      yield takeEvery(actions.delete.types.success, reloadList)
    },

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

export default TableSaga