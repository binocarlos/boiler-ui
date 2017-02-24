// generic reducer that keeps a value
// it can reset to the original value

import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

export const REQUIRED_TYPES = [
  'set',
  'reset'
]

const ValueReducer = (types = {}, defaultValue) => {
  deepCheck(types, REQUIRED_TYPES)

  const DEFAULT_STATE = {
    originalValue: defaultValue,
    value: defaultValue
  }

  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      
      case types.set:
        return update(state, {
          value:{
            $set:action.value
          }
        })

      case types.reset:
        return update(state, {
          originalValue:{
            $set:state.originalValue
          }
        })

      default:
        return state
    }
  }
}

export default ValueReducer