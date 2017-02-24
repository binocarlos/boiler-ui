import update from 'immutability-helper'
import immutable from 'object-path-immutable'
import deepCheck from 'deep-check-error'

export const DEFAULT_STATE = {
  data:{},
  meta:{},
  originalData:{},
  originalMeta:{}
}

const REQUIRED_TYPES = [
  'inject',
  'updated',
  'revert'
]

const FormReducer = (types = {}) => {

  deepCheck(types, REQUIRED_TYPES)
  
  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      case types.inject:
        return update(state, {
          data: {
            $set: action.data
          },
          originalData:{
            $set: action.data
          },
          meta: {
            $set: action.meta
          },
          originalMeta:{
            $set: action.meta
          },
        })

      case types.updated:
        return update(state, {
          data:{
            $set: action.data
          },
          meta:{
            $set: action.meta
          }
        })

      case types.revert:
        return update(state, {
          data:{
            $set: state.originalData
          },
          meta:{
            $set: state.originalMeta
          }
        })

      default:
        return state
    }
  }
}

export default FormReducer