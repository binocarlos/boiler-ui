export const ClipboardSelectors = (raw) => {
  const selectors = {
    mode: (state) => raw(state).mode.value || 'copy',
    ids: (state) => raw(state).ids.value || [],
    container: (state) => {
      return {
        clipboardMode: selectors.mode(state),
        clipboardIds: selectors.ids(state),
      }
    }
  }

  return selectors
}

export default ClipboardSelectors