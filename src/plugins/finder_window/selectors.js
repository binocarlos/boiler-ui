export const ResourceFinderSelectors = (raw, searchPlugin, listPlugin) => {

  const searchSelectors = searchPlugin.selectors
  const listSelectors = listPlugin.selectors

  const selectors = {
    windowOpen: (state) => raw(state).window.open,
    search: searchSelectors,
    list: listSelectors,
    container: (state) => {
      const finder = {
        windowOpen: selectors.windowOpen(state)
      }

      const search = selectors.search.container(state)
      const list = selectors.list.container(state)

      return Object.assign({}, list, search, finder)
    }
  }
  return selectors
}

export default ResourceFinderSelectors