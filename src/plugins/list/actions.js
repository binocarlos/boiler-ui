import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'

const ListActions = (base) => {
  const actions = {
    list: ApiActions(base + '_LIST'),
    reorder: ValueActions(base + '_REORDER'),
    dispatcher: (dispatch) => {
      return {
        dispatch: dispatch,
        open: (id) => dispatch(actions.redirect('open', {id}))
      }
    }
  }

  return actions
}

export default ListActions
