import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import systemActions from '../../actions/system'

const REQUIRED_SETTINGS = [
  'trigger',
  'reloadUserAction',
  'activateAction',
  'selectors.userdata',
  'selectors.installations'
]

const InstallationDropdownSaga = (settings = {}) => {
  const trigger = settings.trigger
  const reloadUserAction = settings.reloadUserAction
  const activateAction = settings.activateAction
  const selectors = settings.selectors

  const sagas = [

    // listen for any system mutations and display a snackbar
    function* listenForDropdownChange() {
      function* activateInstallation(action) {
        const installations = yield select(selectors.installations)

        const activeInstallationId = action.payload
        const activeInstallationObj = installations
          .filter(installation => installation.id == activeInstallationId)[0]
        const installationTitle = activeInstallationObj ?
          activeInstallationObj.name :
          ''

        yield put(activateAction.request({
          id: activeInstallationId
        }))
        yield take(activateAction.types.success)
        yield put(reloadUserAction.request())
        yield put(systemActions.mutation({
          message: installationTitle + ' activated'
        }))
      }
      yield takeLatest(trigger, activateInstallation)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default InstallationDropdownSaga