// generic events that are not namespaced
// (and so can easily by used by other plugins)
import {
  action,
  getTypes
} from './tools'

const base = 'SYSTEM'
const types = getTypes(base, [
  'MUTATION',
  'ERROR'
])

const SystemActions = {
  types,
  base,
  mutation: (payload) => action(types.mutation, {payload}),
  error: (payload) => action(types.error, {payload})
}

export default SystemActions