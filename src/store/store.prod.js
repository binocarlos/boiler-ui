import factory from './storefactory'

const configureStore = (opts = {}) => {
  return factory(opts)
}

export default configureStore