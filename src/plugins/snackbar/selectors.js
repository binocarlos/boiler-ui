export const SnackbarSelectors = (raw) => {
  return {
    open: (state) => raw(state).open,
    text: (state) => {
      const payload = raw(state).payload || {}
      return payload.message || ''
    }
  }
}

export default SnackbarSelectors