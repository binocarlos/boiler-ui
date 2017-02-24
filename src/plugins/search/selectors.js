export const SearchSelectors = (raw) => {
  const selectors = {
    current: (state) => raw(state).current.value,
    container: (state) => {
      return {
        searchValue: selectors.current(state)
      }
    }
  }

  return selectors
}

export default SearchSelectors