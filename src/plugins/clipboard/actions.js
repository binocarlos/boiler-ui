import ApiActions from '../../actions/api'
import RouterActions from '../../actions/router'
import ValueActions from '../../actions/value'
import TriggerActions from '../../actions/trigger'

import systemActions from '../../actions/system'

const modeTitles = {
  copy: 'copied',
  cut: 'cut'
}

const ClipboardPluginActions = (base) => {
  const redirect = RouterActions.redirect(base)
  const actions = {
    mode: ValueActions(base + '_MODE'),
    ids: ValueActions(base + '_IDS'),
    submit: TriggerActions(base + '_PASTE_SUBMIT'),
    paste: ApiActions(base + '_PASTE_API'),
    redirect: redirect,
    dispatcher: (dispatch) => {
      return {
        dispatch: dispatch,
        setClipboard: (mode, ids) => {
          dispatch(actions.mode.set(mode))
          dispatch(actions.ids.set(ids))
          dispatch(systemActions.mutation({
            message: ids.length + 'item' + (ids.length == 1 ? '' : 's') + ' ' + (modeTitles[mode] || 'copied')
          }))
        },
        submitClipboard: () => dispatch(actions.submit.trigger())
      }
    }
  }

  return actions
}

export default ClipboardPluginActions
