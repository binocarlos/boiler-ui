import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import ListReducer from '../../reducers/list'

const ListPluginReducer = (actions) => {
  return combineReducers({
    list: ApiReducer(actions.list.types),
    data: ListReducer({
      update: actions.list.types.success,
      reorder: actions.reorder.types.set
    })
  })
}

export default ListPluginReducer