import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

export const DEFAULT_STATE = {
  data: {}
}

const REQUIRED_TYPES = [
  'set',
  'reset'
]

const ItemDataReducer = (types = {}, initialData = {}) => {
  deepCheck(types, REQUIRED_TYPES)
  const defaultState = Object.assign({}, DEFAULT_STATE, {
    data: initialData
  })
  return (state = defaultState, action) => {
    switch (action.type) {
      case types.set:
        return update(state, {
          data: {
            [action.id]: {
              $set: action.value
            }
          }
        })
      case types.reset:
        return update(state, {
          data: {
            $set: {}
          }
        })
      default:
        return state
    }
  }
}

export default ItemDataReducer