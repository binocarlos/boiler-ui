import { combineReducers } from 'redux'

import ToggleReducer from 'boiler-ui/lib/reducers/toggle'
import ValueReducer from 'boiler-ui/lib/reducers/value'

const ResourceFinderPluginReducer = (actions, search, list) => {

  return combineReducers({
    window: ToggleReducer(actions.window.types),
    search: search.reducer,
    list: list.reducer
  })
}

export default ResourceFinderPluginReducer