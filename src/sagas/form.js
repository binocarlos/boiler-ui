/*

  saga for processing form updates and validation

  2 events that start the process:

   * initialize - a new item is being created
   * load - an existing item if being edited

  Dispatching either action signifies that a new `schema` should be loaded

  The schema is an array of objects with the following fields:

   * name
   * get(data = {})               - return the current value (data is the whole item)
   * getInitial(data = {})        - return the default value (if there is no value found)
   * set(value, data = {})        - inject the current value into the item data
   * validate(value, data = {})   - return null if the value is correct or a string for an error
                                  - return a function that returns a promise for async validation

  You pass a `getSchema` function that is called with the data that was passed to
  `initilize` or `load`

  The schema is then iterated and meta generated for each field before 'inject' is called
  with data and meta

  The difference between `initilize` or `load` is that `getInitial` is called for 
  each field for `initilize`

  The key properties of the meta data:

  {
    'address.city': {
      valid: true,
      touched: false,
      error: null
    },
    'address.postcode': {
      valid: false,
      touched: true,
      error: 'must have a space'
    }
  }

*/
import deepCheck from 'deep-check-error'
import { takeLatest, takeEvery } from 'redux-saga'
import { put, call, fork, select  } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'getSchema',
  'selector',
  'actions.types.initialize',
  'actions.types.load',
  'actions.types.update',
  'actions.types.touch',
  'actions.types.touchform',
  'actions.inject',
  'actions.updated'
]

const FormSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const getSchema = settings.getSchema
  const selector = settings.selector
  const triggers = actions.types

  // this is populated by settings.getSchema using the data
  // given to initalize or load
  let schema = getSchema({})

  function updateSchema(data) {
    schema = getSchema(data)
  }

  function* initializeSaga(action) {
    updateSchema(action.data)
    const data = schema.initialData(action.data)
    const meta = schema.meta(data)
    yield put(actions.inject(data, meta))
  }

  function* loadSaga(action) {
    updateSchema(action.data)
    const meta = schema.meta(action.data)
    yield put(actions.inject(action.data, meta))
  }

  function* updateSaga(action) {
    const currentState = yield select(selector)
    const result = schema.update(
      action.name,
      action.value,
      currentState.data,
      currentState.meta
    )
    yield put(actions.updated(result.data, result.meta))
  }

  function* touchSaga(action) {
    const currentState = yield select(selector)
    const meta = schema.touch(action.name, currentState.meta)
    yield put(actions.updated(currentState.data, meta))
  }

  function* touchformSaga(action) {
    const currentState = yield select(selector)
    const meta = schema.touchForm(currentState.meta)
    yield put(actions.updated(currentState.data, meta))
  }

  function* root() {

    function* listenInitialize() {
      yield takeEvery(triggers.initialize, initializeSaga)  
    }

    function* listenLoad() {
      yield takeEvery(triggers.load, loadSaga)  
    }

    function* listenUpdate() {
      yield takeEvery(triggers.update, updateSaga)  
    }

    function* listenTouch() {
      yield takeEvery(triggers.touch, touchSaga)  
    }

    function* listenTouchform() {
      yield takeEvery(triggers.touchform, touchformSaga)  
    }

    yield [
      fork(listenInitialize),
      fork(listenLoad),
      fork(listenUpdate),
      fork(listenTouch),
      fork(listenTouchform)
    ]

    yield put(actions.initialize({}, {}))
  }

  return root
}

export default FormSagaFactory