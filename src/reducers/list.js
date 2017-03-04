// keeps a list of data as an object of ids and array of ids
import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

export const DEFAULT_STATE = {
  // the database of id -> data
  db: {},
  // the array of ids dictating order
  ids: [],
  // keep the original order so we can change it
  originalIds: []
}

const REQUIRED_TYPES = [
  'update',
  'reorder'
]

const ListReducer = (types = {}) => {

  deepCheck(types, REQUIRED_TYPES)

  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      // input = array of objects
      // output = object with 'db' and 'ids'
      case types.update:
        const data = action.payload || []
        const db = data.reduce((all, obj) => {
          return Object.assign({}, all, {
            [obj.id]: obj
          })
        }, {})
        const ids = data.map(item => item.id)
        return update(state, {
          db: {
            $set: db
          },
          ids: {
            $set: ids
          },
          originalIds: {
            $set: ids
          }
        })

      case types.reorder:
        return update(state, {
          ids: {
            $set: action.value || []
          }
        })

      default:
        return state
    }
  }
}

export default ListReducer