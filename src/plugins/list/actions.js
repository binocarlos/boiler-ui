import ApiActions from '../../actions/api'

const ListActions = (base) => {
  const actions = {
    list: ApiActions(base + '_LIST'),
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
