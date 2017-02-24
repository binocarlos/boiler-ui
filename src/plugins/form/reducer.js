import { combineReducers } from 'redux'

import ApiReducer from '../../reducers/api'
import FormReducer from '../../reducers/form'

const FormWrapperReducer = (actions) => {
  return combineReducers({
    get: ApiReducer(actions.get.types),
    post: ApiReducer(actions.post.types),
    put: ApiReducer(actions.put.types),
    fields: FormReducer(actions.fields.types)
  })
}

export default FormWrapperReducer