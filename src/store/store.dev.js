import createLogger from 'redux-logger'
import factory from './storefactory'

const configureStore = (opts = {}) => {
  opts.middleware = localStorage && localStorage.debug && localStorage.debug.toString() == 'true' ?
    opts.middleware.concat([
      createLogger({
        collapsed:true
      })
    ]) :
    []
  opts.extraComposeArgs = [
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ]
  return factory(opts)
}

export default configureStore