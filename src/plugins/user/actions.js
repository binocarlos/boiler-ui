import ApiActions from '../../actions/api'
import FormActions from '../../actions/form'

const UserActions = (base) => {
  return {
    status: {
      api: ApiActions(base + '_STATUS_API')
    },
    update: ApiActions(base + '_UPDATE_API'),
    login: {
      api: ApiActions(base + '_LOGIN_API'),
      form: FormActions(base + '_LOGIN_FORM')
    },
    register: {
      api: ApiActions(base + '_REGISTER_API'),
      form: FormActions(base + '_REGISTER_FORM')
    }
  }
}

export default UserActions