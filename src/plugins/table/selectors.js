export const TableSelectors = (raw) => {
  const dataSelector = (state) => raw(state).data

  const selectors = {
    data: dataSelector,
    error: (state) => raw(state).list.error,
    selection: (state) => raw(state).selection.value,
    deleteWindowOpen: (state) => raw(state).deleteWindow.open,
    items: (state) => {
      const db = dataSelector(state).db
      return dataSelector(state).ids.map(id => db[id])
    },
    container: (state) => {
      const data = selectors.items(state)
      const selection = selectors.selection(state)
      const selectedItems = selection.map(i => data[i])
      const isDeleteWindowOpen = selectors.deleteWindowOpen(state)
      const error = selectors.error(state)

      return {
        data,
        selection,
        selectedItems,
        isDeleteWindowOpen,
        error
      }
    }
  }
  return selectors
}

export default TableSelectors