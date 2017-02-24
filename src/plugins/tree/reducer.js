import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import ItemDataReducer from '../../reducers/itemdata'
import ListReducer from '../../reducers/list'

const TreeReducer = (actions) => {
  return combineReducers({
    list: ApiReducer(actions.list.types),
    toggleState: ItemDataReducer(actions.toggle.types, {
      root: true
    }),
    data: ListReducer({
      update: actions.list.types.success
    })
  })
}

export default TreeReducer