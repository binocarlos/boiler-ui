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
  error:null,
  // optional if we keep the data here
  // this is simpler but often you want the actual data to live
  // somewhere else in your state tree
  // opts.keepData = true must be set for this to be populated
  payload:null
}

const REQUIRED_TYPES = [
  'request',
  'success',
  'failure'
]

const ApiReducer = (types = {}, opts = {}) => {

  deepCheck(types, REQUIRED_TYPES)

  const apiReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      case types.request:
        return update(state, {
          $merge:{
            query: action.query,
            loading: true,
            loaded: false,
            payload: null,
            error: null
          }
        })

      case types.success:

        let newData = {
          query: action.query,
          loading: false,
          loaded: true,
          error: null,
          payload: null
        }

        if(opts.keepData) {
          newData.payload = action.payload
        }

        return update(state, {
          $merge:newData
        })

      case types.failure:
        return update(state, {
          $merge:{
            query: action.query,
            loading: false,
            loaded: true,
            payload: null,
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