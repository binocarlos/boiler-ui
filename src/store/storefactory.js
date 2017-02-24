import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router'
import { relativePath } from '../tools'

const configureStore = (opts = {}) => {
  if(!opts.reducer) throw new Error('reducer required')
  const middleware = opts.middleware || []
  const routes = opts.routes || {}
  const reducer = opts.reducer
  const initialState = opts.initialState
  const extraComposeArgs = opts.extraComposeArgs || []
  const sagaMiddleware = createSagaMiddleware()

  const {
    routerEnhancer,
    routerMiddleware  
  } = routerForBrowser({
    routes
  })

  const finalMiddleware = [
    routerMiddleware,
    sagaMiddleware
  ].concat(middleware)

  const store = createStore(
    reducer,
    initialState,
    compose.apply(null, [
      routerEnhancer,
      applyMiddleware.apply(null, finalMiddleware)
    ].concat(extraComposeArgs))
  )

  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))  
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore