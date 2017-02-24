import {
  action,
  getTypes
} from './tools'

const ValueActions = (base) => {
  const types = getTypes(base, [
    'SET',
    'RESET'
  ])
  return {
    types,
    base,
    set: (value) => action(types.set, {value}),
    reset: () => action(types.reset)
  }
}

export default ValueActions