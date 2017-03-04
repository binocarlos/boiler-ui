import ApiActions from '../../actions/api'
import TriggerActions from '../../actions/trigger'
import ValueActions from '../../actions/value'
import ItemDataActions from '../../actions/itemdata'
import RouterActions from '../../actions/router'

const TreeActions = (base) => {
  const redirect = RouterActions.redirect(base)

  const actions = {
    list: ApiActions(base + '_LIST'),
    reorder: ValueActions(base + '_REORDER'),
    toggle: ItemDataActions(base + '_TOGGLE'),
    openAncestors: TriggerActions(base + '_OPEN_ANCESTORS'),
    reload: TriggerActions(base + '_RELOAD'),
    redirect: redirect,
    dispatcher: (dispatch) => {
      return {
        dispatch: dispatch,
        view: (id) => dispatch(actions.redirect('open', {id})),
        toggle: (id, value) => dispatch(actions.toggle.set(id, value))
      }
    }
  }

  return actions
}

export default TreeActions
