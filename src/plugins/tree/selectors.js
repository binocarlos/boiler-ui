export const TreeSelectors = (raw, active) => {
  const dataSelector = (state) => raw(state).data

  const selectors = {
    data: dataSelector,
    error: (state) => raw(state).list.error,
    toggleState: (state) => raw(state).toggleState.data,
    active,
    // here we map the list of items into a tree
    items: (state) => {
      const data = dataSelector(state) 
      const db = data.db
      const ids = data.ids

      let rootItems = []
      let children = {}
      let newdb = {}

      const items = ids.map(id => {
        const ret = Object.assign({}, db[id], {
          children: []
        })
        newdb[ret.id] = ret
        return ret
      })

      items.forEach(item => {
        const parent = newdb[item.parent]

        if(!parent) {
          rootItems.push(item)
        }
        else {
          parent.children.push(item)
        }
      })

      return rootItems
    },
    container: (state) => {
      const data = selectors.items(state)
      const error = selectors.error(state)
      const toggleState = selectors.toggleState(state)
      const activeid = active(state)

      return {
        data,
        active: activeid,
        error,
        toggleState
      }
    }
  }
  return selectors
}

export default TreeSelectors