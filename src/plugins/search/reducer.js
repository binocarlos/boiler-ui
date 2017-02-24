import { combineReducers } from 'redux'

import ValueReducer from '../../reducers/value'

const SearchReducer = (actions) => {
  return combineReducers({
    current: ValueReducer(actions.current.types)
  })
}

export default SearchReducer