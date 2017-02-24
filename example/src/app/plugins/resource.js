import { combineReducers } from 'redux'

import { takeLatest, takeEvery } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import TreePlugin from 'boiler-ui/lib/plugins/tree'
import TablePlugin from 'boiler-ui/lib/plugins/table'
import ListPlugin from 'boiler-ui/lib/plugins/list'
import FormPlugin from 'boiler-ui/lib/plugins/form'
import ClipboardPlugin from 'boiler-ui/lib/plugins/clipboard'
import SearchPlugin from 'boiler-ui/lib/plugins/search'

import FinderPlugin from './resource_finder'

import { getPathnameValue } from 'boiler-ui/lib/tools'

import schemas from '../config/schemas'
import icons from '../config/icons'
import apis from '../apis'

import {
  parentIdRouteSelector
} from '../tools'

const getItemTitle = getPathnameValue('name')
const getTableTitle = () => 'Resources'
const getFormTitle = (item) => (item.type || '').replace(/^\w/, (s) => s.toUpperCase()) + ' Resource'
const getIcon = (item) => item ? (icons[item.type] || icons.folder) : icons.folder

const names = {
  clipboard: 'RESOURCE_CLIPBOARD',
  search: 'RESOURCE_SEARCH',
  finder: 'RESOURCE_FINDER',
  usertree: 'RESOURCE_USER_TREE',
  systemtree: 'RESOURCE_SYSTEM_TREE',
  usertable: 'RESOURCE_USER_TABLE',
  systemtable: 'RESOURCE_SYSTEM_TABLE',
  userform: 'RESOURCE_USER_FORM',
  systemform: 'RESOURCE_SYSTEM_FORM'
}

const clipboard = ClipboardPlugin({
  name: names.clipboard,
  apis: {
    paste: apis.userresource.paste
  },
  selector: state => state.resource.clipboard
})

const search = SearchPlugin({
  name: names.search,
  delay: 300,
  selector: state => state.resource.search
})

const finder = FinderPlugin({
  name: names.finder,
  selector: state => state.resource.finder
})

const usertable = TablePlugin({
  name: names.usertable,
  apis: Object.assign({}, apis.userresource, {
    list: apis.userresource.children
  }),
  reloadSelector: parentIdRouteSelector,
  reloadTriggers: [
    clipboard.actions.paste.types.success
  ],
  selector: state => state.resource.usertable
})

const systemtable = TablePlugin({
  name: names.systemtable,
  apis: Object.assign({}, apis.systemresource, {
    list: apis.systemresource.children
  }),
  reloadTriggers: [],
  selector: state => state.resource.systemtable
})

const userform = FormPlugin({
  name: names.userform,
  apis: apis.userresource,
  selector: state => state.resource.userform,
  getSchema: schemas.resource,
  getTitle: (item) => item.name
})

const systemform = FormPlugin({
  name: names.systemform,
  apis: apis.systemresource,
  selector: state => state.resource.systemform,
  getSchema: schemas.resource,
  getTitle: (item) => item.name
})

const usertree = TreePlugin({
  name: names.usertree,
  apis: {
    list: apis.userresource.listfolders
  },
  reloadTriggers: [
    usertable.actions.delete.types.success,
    userform.actions.post.types.success,
    userform.actions.put.types.success,
    clipboard.actions.paste.types.success
  ],
  selector: state => state.resource.usertree,
  // we only highlight 'root' for the correct tree
  activeSelector: state => {
    return state.router.result.tree == 'user' ?
      state.router.params.parentid :
      null
  }
})

const systemtree = TreePlugin({
  name: names.systemtree,
  apis: {
    list: apis.systemresource.listfolders
  },
  reloadTriggers: [
    systemtable.actions.delete.types.success,
    systemform.actions.post.types.success,
    systemform.actions.put.types.success
  ],
  selector: state => state.resource.systemtree,
  activeSelector: state => {
    return state.router.result.tree == 'system' ?
      state.router.params.parentid :
      null
  }
})

const reducer = combineReducers({
  usertree: usertree.reducer,
  systemtree: systemtree.reducer,
  usertable: usertable.reducer,
  systemtable: systemtable.reducer,
  userform: userform.reducer,
  systemform: systemform.reducer,
  clipboard: clipboard.reducer,
  search: search.reducer,
  finder: finder.reducer
})


/*

  sagas
  
*/

// listen for when the resource finder submits an item
// inject it into the links property of the currently editing resource
function* resourceFinderSubmitted(action) {
  const resource = action.payload
  const existingLinks = yield select(state => state.resource.userform.fields.data.links) 
  const newLinks = (existingLinks || []).concat([{
    id: resource.id,
    meta: {},
    resource: resource
  }])

  yield put(userform.actions.fields.update('links', newLinks))
  yield put(finder.actions.window.toggle(false))
  yield put(finder.actions.search.current.set(''))
}

const sagas = [
  usertree.saga,
  systemtree.saga,
  usertable.saga,
  systemtable.saga,
  userform.saga,
  systemform.saga,
  clipboard.saga,
  search.saga,
  finder.search.saga,
  finder.list.saga,
  function* waitForFinder() {
    yield takeLatest(finder.actions.submit.types.trigger, resourceFinderSubmitted)
  }
]

const resource = {
  getItemTitle,
  getTableTitle,
  getFormTitle,
  getIcon,
  names,
  usertree,
  systemtree,
  usertable,
  systemtable,
  userform,
  systemform,
  clipboard,
  search,
  finder,
  reducer,
  sagas
}

export default resource