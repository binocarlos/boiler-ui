import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

export const DEFAULT_STATE = {
  open: false,
  payload: null
}

const REQUIRED_TYPES = [
  'toggle'
]

const ToggleReducer = (types = {}) => {
  deepCheck(types, REQUIRED_TYPES)
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.toggle:
        return update(state, {
          open:{
            $set:action.open
          },
          payload:{
            $set:action.payload
          }
        })
      default:
        return state
    }
  }
}

export default ToggleReducer