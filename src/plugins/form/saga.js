import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import routerActions from '../../actions/router'
import systemActions from '../../actions/system'
import ApiSaga from '../../sagas/api'
import FormSaga from '../../sagas/form'
import Schema from '../../utils/schema'

const REQUIRED_SETTINGS = [
  'getSchema',
  'getTitle',
  'actions.get',
  'actions.post',
  'actions.put',
  'actions.fields',
  'selectors',
  'apis.get',
  'apis.put',
  'apis.post'
]

const FormPluginSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getSchema = settings.getSchema
  const getTitle = settings.getTitle
  const actions = settings.actions
  const selectors = settings.selectors
  const apis = settings.apis
  const successRedirect = settings.successRedirect

  const sagas = [

    FormSaga({
      getSchema: (data) => Schema(getSchema(data)),
      selector: selectors.fields,
      actions: actions.fields
    }),

    // GET /api/v1/installations/:id
    ApiSaga({
      api: apis.get,
      actions: actions.get
    }),

    // POST /api/v1/installations
    ApiSaga({
      api: apis.post,
      actions: actions.post
    }),

    // PUT /api/v1/installations/:id
    ApiSaga({
      api: apis.put,
      actions: actions.put
    }),

    // for the edit form - trigger a form.load action
    // once the data is loaded
    function* listenForLoadedData() {
      function* triggerLoad(action) {
        yield put(actions.fields.load(action.payload))
      }
      yield takeLatest(actions.get.types.success, triggerLoad)
    },

    function* listenForSubmit() {
      const trigger = actions.fields.types.submit
      function* submitForm(action) {
        const routerState = yield select(state => state.router)
        const hasError = yield select(state => selectors.hasError(state))

        if(hasError) {
          yield put(actions.fields.touchform())
          return
        }

        const fieldState = yield select(state => selectors.fields(state))

        const payload = fieldState.data

        // check if we are doing a put or post
        const page = routerState.result
        const query = routerState.params

        // page.api = {put,post}
        if(!page.api || !actions[page.api]){
          throw new Error('router result needs api property')
        }
      
        // the put or post actions
        const apiActions = actions[page.api]
        yield put(apiActions.request(query, payload))

        // wait for the error/success response
        const responseAction = yield take([
          apiActions.types.failure,
          apiActions.types.success
        ])

        if(responseAction.type === apiActions.types.success) {
          yield put(systemActions.mutation({
            message: page.api == 'put' ?
              getTitle(payload) + ' saved' :
              getTitle(payload) + ' created'
          }))
          yield put(actions.redirect('saved', payload))
        }
      }
      yield takeLatest(trigger, submitForm)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default FormPluginSaga