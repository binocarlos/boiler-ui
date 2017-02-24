import deepCheck from 'deep-check-error'

import { takeLatest, takeEvery } from 'redux-saga'
import { fork, put, take, select, call } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'

const REQUIRED_SETTINGS = [
  'actions.list',
  'selectors.items',
  'apis.list'
]

// get an array of ids from root -> node
const getAncestors = (treedata, id) => {
  const db = treedata.db
  let ids = []
  let item = db[id]
  while(item){
    ids.unshift(item.id)
    item = db[item.parent]
  }
  ids.unshift('root')
  return ids
}

const TreeSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getSchema = settings.getSchema
  
  const actions = settings.actions
  const selectors = settings.selectors
  const reloadTriggers = settings.reloadTriggers || []
  const apis = settings.apis

  let treeDataLoaded = false
  let openAncestorCache = null

  function* openAncestors(action) {
    if(!treeDataLoaded) {
      openAncestorCache = action
      return
    }
    const parentid = action.payload
    const treedata = yield select(selectors.data)
    const toggleState = yield select(selectors.toggleState)
    const ancestors = getAncestors(treedata, parentid)

    yield ancestors.map(id => put(actions.toggle.set(id, true)))
  }

  function* initialTreeDataHasLoaded(action) {
    treeDataLoaded = true
    if(openAncestorCache) {
      yield call(openAncestors, openAncestorCache)
      openAncestorCache = null
    }
  }

  function* reloadTree(action) {
    yield put(actions.reload.trigger())
  }

  const sagas = [

    // GET /api/v1/resources
    ApiSaga({
      api: apis.list,
      actions: actions.list
    }),

    function* listenForInitialTreeData() {      
      yield takeEvery(actions.list.types.success, initialTreeDataHasLoaded)
    },

    function* listenForOpenAncestors() {
      yield takeEvery(actions.openAncestors.types.trigger, openAncestors)
    },

    function* listenForReloads() {
      yield takeEvery(reloadTriggers, reloadTree)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default TreeSaga