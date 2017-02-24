import deepCheck from 'deep-check-error'

import { takeLatest, takeEvery } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'
import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'actions.paste',
  'apis.paste',
  'selectors.ids',
  'selectors.mode'
]

const ClipboardSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const apis = settings.apis
  const selectors = settings.selectors

  const sagas = [

    // POST /api/v1/resources/paste
    ApiSaga({
      api: apis.paste,
      actions: actions.paste
    }),

    function* listenForPasteSuccess() {
      function* clearClipboard(action) {
        yield put(systemActions.mutation({
          message: 'items pasted'
        }))
        yield put(actions.mode.set(null))
        yield put(actions.ids.set([]))
      }

      yield takeEvery(actions.paste.types.success, clearClipboard)
    },

    function* listenForSubmit() {
      const trigger = actions.submit.types.trigger

      function* submitPaste(action) {
        const mode = yield select(selectors.mode)
        const ids = yield select(selectors.ids)
        let params = {
          [mode]: ids.join(',')
        }
        yield put(actions.paste.request(params))
      }

      yield takeLatest(trigger, submitPaste)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default ClipboardSaga