import ToggleReducer from '../../reducers/toggle'

const MenuReducer = (actions) => {
  return ToggleReducer(actions.types)
}

export default MenuReducer