import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import ValueReducer from '../../reducers/value'

const ClipboardReducer = (actions) => {
  return combineReducers({
    mode: ValueReducer(actions.mode.types),
    ids: ValueReducer(actions.ids.types),
    paste: ApiReducer(actions.paste.types)
  })
}

export default ClipboardReducer