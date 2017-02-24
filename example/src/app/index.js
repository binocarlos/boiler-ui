import 'react-toolbox/lib/commons.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

// the factory function that hooks up routes, reducers and sagas
// it plugs in redux-little-router and redux-saga middleware
import AppFactory from 'boiler-ui/lib/factory'

// looks after rendering the routes when the url changes
import Screens from 'boiler-ui/lib/containers/Screens'

// the apis used to connect to the backend data services
import apis from './apis'

// an array of the root sagas we will run
import Sagas from './sagas'

// use combineReducers to create the overall app reducer
// the 'router' will be automatically injected by redux-little-router
import reducer from './reducer'

import settings from './config/core'

// we keep the route info and fragments in the same file for readability
// the route info is what is reduced when the route is active
// the fragments control what container shows for what route
import {
  routes,
  fragments
} from './routes'

// an opinionated App Wrapper - this is kept in the app because there will be
// lots of variations in how the overall app layout should work
// this also gives the chance to inject statics (like the snackbar)
import Wrapper from './containers/Wrapper'

// the base URL where the app is hosted - this is removed from paths
const BASE_PATH = settings.basepath

// if we are using server side rendering - this will be populated
const INITIAL_STATE = window.__INITIAL_STATE__

// the route info and sagas that we pass to the AppFactory
const sagas = Sagas(apis)

// create a render function that we pass our root container into
const render = AppFactory({
  basepath: BASE_PATH,
  initialState: INITIAL_STATE,
  routes,
  reducer,
  sagas
})

ReactDOM.render(
  render(
    <Wrapper>
      <Screens
        basepath={ BASE_PATH }
        getFragments={ fragments }
      />
    </Wrapper>
  ),
  document.getElementById('mount')
)