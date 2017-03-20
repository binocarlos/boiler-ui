import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment, AbsoluteFragment } from 'boiler-ui/lib/components/Router'
import routerActions from 'boiler-ui/lib/actions/router'

import Login from './containers/Login'

import BookingTable from './containers/BookingTable'
import BookingForm from './containers/BookingForm'

import Home from './components/Home'
import Help from './components/Help'
import About from './components/About'

import actions from './actions'
import plugins from './plugins'
import selectors from './selectors'

// these tools map in the basepath onto any of the routes
// the basepath is the mountpoint of the app (e.g. '/app' or '/admin')
import { 
  routeProcessor,
  getRoute,
  homeRouteMatcher
} from './tools'

const guest = (route) => {
  return Object.assign({}, route, {
    requireGuest: getRoute('/')
  })
}

const user = (route) => {
  return Object.assign({}, route, {
    requireUser: getRoute('/')
  })
}

/*

  ROUTE CONFIG
  
*/

export const routes = routeProcessor({
  '': {},
  '/': {},
  '/help': {},
  '/about': {},
  '/login': guest({}),
  '/bookings': user({
    '/add': {
      api: 'post'
    },
    '/edit/:id': {
      api: 'put'
    }
  })
})

/*

  DATA HANDLERS
  
*/

export const triggerHandlers = {

  loadBookings: (state, initial) => [
    plugins.booking.table.actions.selection.set([]),
    plugins.booking.table.actions.list.request()
  ],
  addBooking: (state, initial) => [
    plugins.booking.form.actions.fields.initialize({}),
    plugins.booking.newData.action.request()
  ],
  editBooking: (state, initial) => [
    plugins.booking.form.actions.fields.initialize({}),
    plugins.booking.form.actions.get.request(state.router.params)
  ]
}

/*

  ROUTE TRIGGERS
  
*/

const routeTriggers = {

  [getRoute('/bookings')]: [triggerHandlers.loadBookings],
  [getRoute('/bookings/add')]: [triggerHandlers.addBooking],
  [getRoute('/bookings/edit/:id')]: [triggerHandlers.editBooking]
}

/*

  DATA TRIGGERS

  how we hook up one event happening to another action triggering
  
*/

export const dataTriggers = {

  [plugins.booking.table.actions.reload.types.trigger]: [
    triggerHandlers.loadBookings
  ]

}

// the action we use to redirect the resource root page to /resources/user/root
const RESOURCES_ROOT_REDIRECT = 'RESOURCES_ROOT_REDIRECT'
const resourceRootRedirector = routerActions.redirect(RESOURCES_ROOT_REDIRECT)

// actions we trigger when a route is loaded
// return an array of actions that are emitted
export const getRouteActions = (state, initial) => {
  const routerState = state.router
  const route = routerState.route

  let getTriggerFns = []

  if(initial) {
    // filters when the app initially loads go here
  }

  // static route matching
  if(routeTriggers[route]) {
    getTriggerFns = getTriggerFns.concat(routeTriggers[route])
  }

  const triggerActions = getTriggerFns.reduce((all, fn) => {
    return all.concat(fn(state, initial))
  }, [])

  return triggerActions
}

/*

  REDIRECTORS
  
*/

// buttons clicked in components can emit the 'ROUTER_REDIRECT' action
// the action has
//  * base     - the action set (e.g. INSTALLATION_TABLE)
//  * name     - the action itself (e.g. edit)
//  * payload  - additional data (e.g. {id:10})

const push = actions.router.push

export const redirectors = {

  // CLIENTS
  [plugins.booking.names.table]: {
    add: (payload, state) => push(getRoute('/booking/add')),
    edit: (payload, state) => push(getRoute('/booking/edit/' + payload.id))
  },

  [plugins.booking.names.form]: {
    cancel: (payload, state) => push(getRoute('/booking')),
    saved: (payload, state) => push(getRoute('/booking'))
  }

}

// relative strips the basepath from the current url
export const fragments = (relative) => {
  const compareRoute = (route) => (pathname) => relative(pathname) == route
  return (
    <div className='routeWrapper'>

      <Fragment forRoute={getRoute('')} withConditions={homeRouteMatcher}>
        <Home />
      </Fragment>

      <Fragment forRoute={getRoute('/login')}>
        <Login />
      </Fragment>

      <Fragment forRoute={getRoute('/help')}>
        <Help />
      </Fragment>

      <Fragment forRoute={getRoute('/about')}>
        <About />
      </Fragment>

      <Fragment forRoute={getRoute('/bookings')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/bookings')}>
          <BookingTable />
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          <BookingForm />
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          <BookingForm />
        </Fragment>
        
      </Fragment>

    </div>
  )
}

/*

  
          

  
*/
export default {
  routes,
  getRouteActions,
  fragments
}