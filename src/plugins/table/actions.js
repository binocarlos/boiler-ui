import ApiActions from '../../actions/api'
import ValueActions from '../../actions/value'
import ToggleActions from '../../actions/toggle'
import TriggerActions from '../../actions/trigger'
import RouterActions from '../../actions/router'

const TableActions = (base) => {
  const actions = {
    list: ApiActions(base + '_LIST'),
    reorder: ValueActions(base + '_REORDER'),
    delete: ApiActions(base + '_DELETE'),
    selection: ValueActions(base + '_SELECTION'),
    deleteWindow: ToggleActions(base + '_DELETE_WINDOW'),
    reload: TriggerActions(base + '_RELOAD'),
    redirect: RouterActions.redirect(base),
    dispatcher: (dispatch) => {
      return {
        dispatch: dispatch,
        add: (payload) => dispatch(actions.redirect('add', payload)),
        edit: (id) => dispatch(actions.redirect('edit', {id})),
        open: (id) => dispatch(actions.redirect('open', {id})),
        //edit: (id) => dispatch(routerActions.push(ownProps.routes.edit.replace(':id', id))),
        select: (selection) => dispatch(actions.selection.set(selection)),
        openDeleteWindow: () => dispatch(actions.deleteWindow.open()),
        closeDeleteWindow: () => dispatch(actions.deleteWindow.close()),
        // send an 'ids' property to the query and we can do multi-delete
        confirmDelete: (ids, message) => dispatch(actions.delete.request({ids, message}))
      }
    }
  }

  return actions
}

export default TableActions
