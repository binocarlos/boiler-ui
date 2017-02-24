import plugins from './plugins'

// extract the parent id for the resource section
// used to reload the table for paste
export const parentIdRouteSelector = (state) => {
  const parentid = state.router.params.parentid
  return !parentid || parentid == 'root' ? 
    null :
    parentid
}

export const currentInstallation = (state) => {
  const id = plugins.user.selectors.status.currentInstallation(state)
  const items = plugins.installation.table.selectors.items(state)
  const current = items.filter(item => item.id == id)[0]
  return current
}

export const resourceSearchValue = (state) => {
  return state.resource.search.current.value
}

const selectors = {
  parentIdRouteSelector,
  currentInstallation,
  resourceSearchValue
}

export default selectors