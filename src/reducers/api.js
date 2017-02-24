// the api reducer keeps the state of the request
// NOT the data (this is the job of the initiating saga)
import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

export const DEFAULT_STATE = {
  // are we in a state of loading
  loading:false,
  // have we loaded any data yet
  loaded:false,
  // the query object passed to the last request
  query:null,
  // the error if it occurred
  error:null
}

const REQUIRED_TYPES = [
  'request',
  'success',
  'failure'
]

const ApiReducer = (types = {}) => {

  deepCheck(types, REQUIRED_TYPES)

  const apiReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      case types.request:
        return update(state, {
          $merge:{
            query: action.query,
            loading: true,
            loaded: false,
            error: null
          }
        })

      case types.success:
        return update(state, {
          $merge:{
            query: action.query,
            loading: false,
            loaded: true,
            error: null
          }
        })

      case types.failure:
        return update(state, {
          $merge:{
            query: action.query,
            loading: false,
            loaded: true,
            error: action.payload
          }
        })
        
      default:
        return state
    }
  }

  return apiReducer
}

export default ApiReducer