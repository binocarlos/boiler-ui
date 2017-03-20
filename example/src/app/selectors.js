import plugins from './plugins'

// extract the parent id for the resource section
// used to reload the table for paste
export const parentIdRouteSelector = (state) => {
  const parentid = state.router.params.parentid
  return !parentid || parentid == 'root' ? 
    null :
    parentid
}

const selectors = {
  parentIdRouteSelector
}

export default selectors