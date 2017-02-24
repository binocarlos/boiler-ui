import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

import { developmentError } from '../tools'
import SystemActions from '../actions/system'

const REQUIRED_SETTINGS = [
  'api',
  'actions.base',
  'actions.types.request',
  'actions.success',
  'actions.failure',
]

const ApiSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const api = settings.api
  const trigger = actions.types.request

  function* apiSaga(action) {

    const state = yield select(state => state)

    /*
    
      query    < - >   params
      payload  < - >   data
      
    */
    try {
      const results = yield api({
        params: action.query,
        data: action.payload,
        state: state
      })
      yield put(actions.success(action.query, results))
    } catch (e) {
      let message = e.message

      // we want to notify the user of HTTP type errors
      // so they know the network is broken or whatever
      if(e.response) {
        const body = e.response.data
        const statusCode = e.response.status

        message = body && body.error ?
          body.error :
          e.message

        let disableErrorMessage = settings.disableErrors ? true : false

        if(statusCode == 403) {
          disableErrorMessage = true
        }

        if(!disableErrorMessage) {
          yield put(SystemActions.error({message}))
        }
      }

      yield put(actions.failure(action.query, message))
      developmentError(e)
    }
  }

  function* listen() {
    yield takeLatest(trigger, apiSaga)
  }

  return listen
}

export default ApiSagaFactory