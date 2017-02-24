import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import FormReducer from '../../reducers/form'
import UserStatusReducer from './userstatus_reducer'

const UserReducer = (actions) => {
  return combineReducers({
    status: combineReducers({
      api: ApiReducer(actions.status.api.types),
      record: UserStatusReducer({
        // update the user record on status.api.success
        update: actions.status.api.types.success
      })
    }),

    login: combineReducers({
      api: ApiReducer(actions.login.api.types),
      // login form state
      form: FormReducer(actions.login.form.types)
    }),

    register: combineReducers({
      api: ApiReducer(actions.register.api.types),
      // register form state
      form: FormReducer(actions.register.form.types)
    }),

    update: combineReducers({
      api: ApiReducer(actions.register.api.types),
    })

  })
}

export default UserReducer