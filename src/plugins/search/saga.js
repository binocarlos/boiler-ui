import deepCheck from 'deep-check-error'

import { takeLatest, takeEvery, delay } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'


import ApiSaga from '../../sagas/api'
import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'actions.submit.trigger'
]

const DELAY = 300

const SearchSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const delayMilliseconds = settings.delay || DELAY
  const actions = settings.actions

  function* runSearch(action) {
    const search = action.value
    yield delay(delayMilliseconds)
    yield put(actions.submit.trigger(search))
  }

  function* root() {
    yield takeLatest(actions.current.types.set, runSearch)
  }

  return root
}

export default SearchSaga