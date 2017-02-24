export const ListSelectors = (raw) => {
  const dataSelector = (state) => raw(state).data

  const selectors = {
    data: dataSelector,
    error: (state) => raw(state).list.error,
    items: (state) => {
      const db = dataSelector(state).db
      return dataSelector(state).ids.map(id => db[id])
    },
    container: (state) => {
      const data = selectors.items(state)
      const error = selectors.error(state)

      return {
        data,
        error
      }
    }
  }
  return selectors
}

export default ListSelectors