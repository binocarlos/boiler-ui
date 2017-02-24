import ValueActions from '../../actions/value'
import TriggerActions from '../../actions/trigger'

const SearchPluginActions = (base) => {
  const actions = {
    current: ValueActions(base + '_VALUE'),
    submit: TriggerActions(base + '_SUBMIT'),
    dispatcher: (dispatch) => {
      return {
        dispatch: dispatch,
        updateSearch: (data) => dispatch(actions.current.set(data))
      }
    }
  }

  return actions
}

export default SearchPluginActions
