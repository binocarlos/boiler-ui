import {
  action,
  getTypes
} from './tools'

const FormActions = (base) => {
  const types = getTypes(base, [
    'INITIALIZE',
    'LOAD',
    'UPDATE',
    'SUBMIT',
    'TOUCH',
    'TOUCHFORM',
    'INJECT',
    'UPDATED',
    'REVERT'
  ])
  return {
    types,
    base,

    // triggers (from containers)

    // we want to inject new form data for an item that does not exist
    // trigger value initializers & generate meta before calling inject
    initialize: (data = {}) => action(types.initialize, {data}),

    // we want to inject form data for an item that has been loaded
    // generate meta and trigger inject
    load: (data = {}) => action(types.load, {data}),

    // a user event as resulted in a raw value for a schema field
    update: (name = '', value = null) => action(types.update, {name, value}),

    // means the user has properly edited and field and the validation
    // status can be displayed (this prevents eager error messages)
    touch: (name = '') => action(types.touch, {name}),
    touchform: () => action(types.touchform),

    // a trigger for a saga
    submit: (payload = {}) => action(types.submit, {payload}),

    // reduced - called by the saga once processing is done

    // once initialize or load have processed - this injects the results into
    // the reducer
    inject: (data = {}, meta = {}) => action(types.inject, {data, meta}),

    // once a field update has been processed
    updated: (data = {}, meta = {}) => action(types.updated, {data, meta}),

    // revert the data to the last injection
    revert: () => action(types.revert)
  }
}

export default FormActions