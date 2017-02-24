import TriggerActions from 'boiler-ui/lib/actions/trigger'
import ToggleActions from 'boiler-ui/lib/actions/toggle'
import ValueActions from 'boiler-ui/lib/actions/value'

const ResourceFinderActions = (base, searchPlugin, listPlugin) => {
  const actions = {
    window: ToggleActions(base + '_WINDOW'),
    library: ValueActions(base + '_LIBRARY'),
    submit: TriggerActions(base + '_SUBMIT'),
    search: searchPlugin.actions,
    list: listPlugin.actions,
    dispatcher: (dispatch) => {
      const finder = {
        dispatch: dispatch,
        openWindow: () => dispatch(actions.window.toggle(true)),
        closeWindow: () => {
          dispatch(actions.window.toggle(false))
          dispatch(actions.search.current.set(''))
        },
        setLibrary: (mode) => dispatch(actions.library.set(mode)),
        submit: (item) => dispatch(actions.submit.trigger(item))
      }
      const search = searchPlugin.actions.dispatcher(dispatch)
      const list = listPlugin.actions.dispatcher(dispatch)

      return Object.assign({}, list, search, finder)
    }
  }

  return actions
}

export default ResourceFinderActions
