import {
  action,
  getTypes
} from './tools'

const ItemDataActions = (base) => {
  const types = getTypes(base, [
    'SET',
    'RESET'
  ])
  return {
    types,
    base,
    set: (id, value) => action(types.set, { id, value }),
    reset: () => action(types.reset)
  }
}

export default ItemDataActions