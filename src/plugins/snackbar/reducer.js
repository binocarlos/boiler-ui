import ToggleReducer from '../../reducers/toggle'

const SnackbarReducer = (actions) => {
  return ToggleReducer(actions.types)
}

export default SnackbarReducer