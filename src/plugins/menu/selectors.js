export const MenuSelectors = (raw) => {
  return {
    open: (state) => raw(state).open
  }
}

export default MenuSelectors