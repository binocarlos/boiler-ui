import React, { Component, PropTypes } from 'react'
import { RelativeFragment as Fragment, AbsoluteFragment } from 'boiler-ui/lib/components/Router'
import routerActions from 'boiler-ui/lib/actions/router'

import Login from './containers/Login'
import Register from './containers/Register'

import ClientTable from './containers/ClientTable'
import ClientForm from './containers/ClientForm'

import InstallationTable from './containers/InstallationTable'
import InstallationForm from './containers/InstallationForm'

import ProjectTable from './containers/ProjectTable'
import ProjectForm from './containers/ProjectForm'

import ResourceTree from './containers/ResourceTree'
import ResourceTable from './containers/ResourceTable'
import ResourceForm from './containers/ResourceForm'

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
  '/register': guest({}),
  '/companies': user({
    '/add': {
      api: 'post'
    },
    '/edit/:id': {
      api: 'put'
    }
  }),
  '/clients': user({
    '/add': {
      api: 'post'
    },
    '/edit/:id': {
      api: 'put'
    }
  }),
  '/projects': user({
    '/add': {
      api: 'post'
    },
    '/edit/:id': {
      api: 'put'
    }
  }),
  '/resources': user({
    '/user': {
      '/view/:parentid': {
        tree: 'user'
      },
      '/add/:parentid/:type': {
        api: 'post',
        tree: 'user'
      },
      '/edit/:parentid/:id': {
        api: 'put',
        tree: 'user'
      }
    },
    '/system': {
      '/view/:parentid': {
        tree: 'system'
      },
      '/add/:parentid/:type': {
        api: 'post',
        tree: 'system'
      },
      '/edit/:parentid/:id': {
        api: 'put',
        tree: 'system'
      }
    }
  })
})

/*

  DATA HANDLER TEMPLATES
  
*/

const triggerTemplates = {

  loadResources: (plugin) => (state, initial) => {
    return [
      plugin.actions.selection.set([]),
      plugin.actions.list.request({
        parentid: selectors.parentIdRouteSelector(state),
        search: selectors.resourceSearchValue(state)
      })
    ]
  },

  // get the item id from the url and trigger the OPEN_ANCESTORS action
  openResourceAncestors: (plugin) => (state, initial) => {
    const parentid = state.router.params.parentid
    return [
      plugin.actions.openAncestors.trigger(parentid)
    ]
  },

  editResource: (plugin) => (state, initial) => {
    
    return [
      plugin.actions.fields.initialize({}),
      plugin.actions.get.request({
        id:state.router.params.id,
        qs:{
          links:'y'
        }
      })
    ]
  },

  addResource: (plugin) => (state, initial) => {
    const initialData = {
      type: state.router.params.type
    }
    return [
      plugins.resource.userform.actions.fields.initialize(initialData)
    ]
  },

  combine: (fns) => (state, initial) => {
    return fns.reduce((all, fn) => {
      return all.concat(fn(state, initial))
    }, [])
  },
}

/*

  DATA HANDLERS
  
*/

export const triggerHandlers = {
  loadCompanies: (state, initial) => [
    plugins.installation.table.actions.selection.set([]),
    plugins.installation.table.actions.list.request()
  ],
  addCompany: (state, initial) => [plugins.installation.form.actions.fields.initialize({})],
  editCompany: (state, initial) => [
    plugins.installation.form.actions.fields.initialize({}),
    plugins.installation.form.actions.get.request(state.router.params)
  ],

  loadClients: (state, initial) => [
    plugins.client.table.actions.selection.set([]),
    plugins.client.table.actions.list.request()
  ],
  addClient: (state, initial) => [
    plugins.client.form.actions.fields.initialize({}),
    plugins.client.newData.action.request()
  ],
  editClient: (state, initial) => [
    plugins.client.form.actions.fields.initialize({}),
    plugins.client.form.actions.get.request(state.router.params)
  ],


  loadProjects: (state, initial) => [
    plugins.project.table.actions.selection.set([]),
    plugins.project.table.actions.list.request(),
    plugins.client.table.actions.list.request()
  ],
  addProject: (state, initial) => [plugins.project.form.actions.fields.initialize({})],
  editProject: (state, initial) => [
    plugins.project.form.actions.fields.initialize({}),
    plugins.project.form.actions.get.request(state.router.params)
  ],

  redirectResourceHome: (state, initial) => [resourceRootRedirector('home')],
    
  loadResourceTree: (state, initial) => {
    return [
      plugins.resource.usertree.actions.list.request(),
      plugins.resource.systemtree.actions.list.request()
    ]
  },

  // load whatever resource page we are currently on
  loadResources: (state, initial) => {
    const currentRoute = state.router.route
    if(currentRoute.indexOf(getRoute('/resources/user')) == 0) {
      return triggerHandlers.loadUserResources(state, initial)
    }
    else if (currentRoute.indexOf(getRoute('/resources/system')) == 0) {
      return triggerHandlers.loadSystemResources(state, initial)
    }
    else {
      return []
    }
  },

  // load whatever resource page the user has clicked the checkbox for
  loadFinderResources: (state, initial) => [
    plugins.resource.finder.actions.list.list.request({
      search: state.resource.finder.search.current.value
    })
  ],

  resetResourceSearch: (state, initial) => [
    plugins.resource.search.actions.current.set('')
  ],

  loadUserResources: triggerTemplates.combine([
    triggerTemplates.loadResources(plugins.resource.usertable),
    triggerTemplates.openResourceAncestors(plugins.resource.usertree)
  ]),

  editUserResource: triggerTemplates.combine([
    triggerTemplates.editResource(plugins.resource.userform),
    triggerTemplates.openResourceAncestors(plugins.resource.usertree)
  ]),

  addUserResource: triggerTemplates.combine([
    triggerTemplates.addResource(plugins.resource.userform),
    triggerTemplates.openResourceAncestors(plugins.resource.usertree)
  ]),

  loadSystemResources: triggerTemplates.combine([
    triggerTemplates.loadResources(plugins.resource.systemtable),
    triggerTemplates.openResourceAncestors(plugins.resource.systemtree)
  ]),

  editSystemResource: triggerTemplates.combine([
    triggerTemplates.editResource(plugins.resource.systemform),
    triggerTemplates.openResourceAncestors(plugins.resource.systemtree)
  ]),


  addSystemResource: triggerTemplates.combine([
    triggerTemplates.addResource(plugins.resource.systemform),
    triggerTemplates.openResourceAncestors(plugins.resource.systemtree)
  ])

}

/*

  ROUTE TRIGGERS
  
*/

const routeTriggers = {

  [getRoute('/companies')]: [triggerHandlers.loadCompanies],
  [getRoute('/companies/add')]: [triggerHandlers.addCompany],
  [getRoute('/companies/edit/:id')]: [triggerHandlers.editCompany],

  [getRoute('/clients')]: [triggerHandlers.loadClients],
  [getRoute('/clients/add')]: [triggerHandlers.addClient],
  [getRoute('/clients/edit/:id')]: [triggerHandlers.editClient],

  [getRoute('/projects')]: [triggerHandlers.loadProjects],
  [getRoute('/projects/add')]: [triggerHandlers.addProject],
  [getRoute('/projects/edit/:id')]: [triggerHandlers.editProject],

  [getRoute('/resources')]: [
    triggerHandlers.loadResourceTree,
    triggerHandlers.redirectResourceHome
  ],

  [getRoute('/resources/user/view/:parentid')]: [
    triggerHandlers.loadUserResources,
    triggerHandlers.resetResourceSearch
  ],
  [getRoute('/resources/user/add/:parentid/:type')]: [
    triggerHandlers.addUserResource
  ],
  [getRoute('/resources/user/edit/:parentid/:id')]: [
    triggerHandlers.editUserResource
  ],

  [getRoute('/resources/system/view/:parentid')]: [
    triggerHandlers.loadSystemResources,
    triggerHandlers.resetResourceSearch
  ],
  [getRoute('/resources/system/add/:parentid/:type')]: [
    triggerHandlers.addSystemResource
  ],
  [getRoute('/resources/system/edit/:parentid/:id')]: [
    triggerHandlers.editSystemResource
  ]

}

/*

  DATA TRIGGERS
  
*/

export const dataTriggers = {
  [plugins.resource.usertable.actions.reload.types.trigger]: [
    triggerHandlers.loadUserResources
  ],

  [plugins.resource.usertree.actions.reload.types.trigger]: [
    triggerHandlers.loadResourceTree
  ],

  [plugins.resource.search.actions.submit.types.trigger]: [
    triggerHandlers.loadResources
  ],

  [plugins.resource.finder.actions.search.submit.types.trigger]: [
    triggerHandlers.loadFinderResources
  ],

  [plugins.resource.finder.actions.library.types.set]: [
    triggerHandlers.loadFinderResources
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

    // load the installation list to drive the dropdown
    getTriggerFns.push(triggerHandlers.loadCompanies)

    // load the resource tree if we are on a route below '/resources'
    if(route.indexOf(getRoute('/resources')) >= 0) {
      getTriggerFns.push(triggerHandlers.loadResourceTree)
    }
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
  [plugins.client.names.table]: {
    add: (payload, state) => push(getRoute('/clients/add')),
    edit: (payload, state) => push(getRoute('/clients/edit/' + payload.id))
  },

  [plugins.client.names.form]: {
    cancel: (payload, state) => push(getRoute('/clients')),
    saved: (payload, state) => push(getRoute('/clients'))
  },

  // INSTALLATION
  [plugins.installationDropdown.base]: {
    edit: (payload, state) => push(getRoute('/companies'))
  },

  [plugins.installation.names.table]: {
    add: (payload, state) => push(getRoute('/companies/add')),
    edit: (payload, state) => push(getRoute('/companies/edit/' + payload.id))
  },

  [plugins.installation.names.form]: {
    cancel: (payload, state) => push(getRoute('/companies')),
    saved: (payload, state) => push(getRoute('/companies'))
  },

  // PROJECTS
  [plugins.project.names.table]: {
    add: (payload, state) => push(getRoute('/projects/add')),
    edit: (payload, state) => push(getRoute('/projects/edit/' + payload.id))
  },

  [plugins.project.names.form]: {
    cancel: (payload, state) => push(getRoute('/projects')),
    saved: (payload, state) => push(getRoute('/projects'))
  },

  // RESOURCES

  [RESOURCES_ROOT_REDIRECT]: {
    home: (payload, state) => push(getRoute('/resources/user/view/root'))
  },

  [plugins.resource.names.usertree]: {
    open: (payload, state) => push(getRoute('/resources/user/view/' + payload.id))
  },

  [plugins.resource.names.systemtree]: {
    open: (payload, state) => push(getRoute('/resources/system/view/' + payload.id))
  },

  [plugins.resource.names.usertable]: {
    add: (payload, state) => push(getRoute('/resources/user/add/' + state.router.params.parentid + '/' + payload.type)),
    edit: (payload, state) => push(getRoute('/resources/user/edit/' + state.router.params.parentid + '/' + payload.id)),
    open: (payload, state) => push(getRoute('/resources/user/view/' + payload.id))
  },

  [plugins.resource.names.userform]: {
    cancel: (payload, state) => push(getRoute('/resources/user/view/' + state.router.params.parentid)),
    saved: (payload, state) => push(getRoute('/resources/user/view/' + state.router.params.parentid))
  },

  [plugins.resource.names.systemtable]: {
    add: (payload, state) => push(getRoute('/resources/system/add/' + state.router.params.parentid + '/' + payload.type)),
    edit: (payload, state) => push(getRoute('/resources/system/edit/' + state.router.params.parentid + '/' + payload.id)),
    open: (payload, state) => push(getRoute('/resources/system/view/' + payload.id))
  },

  [plugins.resource.names.systemform]: {
    cancel: (payload, state) => push(getRoute('/resources/system/view/' + state.router.params.parentid)),
    saved: (payload, state) => push(getRoute('/resources/system/view/' + state.router.params.parentid))
  }
  
}

export const selectorFactories = {

  // add the parentItem into the table selector
  resourceHome: (type) => (state) => {
    const parentid = state.router.params.parentid
    const containerSelector = plugins.resource[type + 'table'].selectors.container
    const treedb = state.resource[type + 'tree'].data.db
    const ret = containerSelector(state)
    const parent = treedb[parentid]

    return Object.assign({}, ret, {
      parentItem: parent
    })
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

      <Fragment forRoute={getRoute('/register')}>
        <Register />
      </Fragment>

      <Fragment forRoute={getRoute('/help')}>
        <Help />
      </Fragment>

      <Fragment forRoute={getRoute('/about')}>
        <About />
      </Fragment>

      <Fragment forRoute={getRoute('/companies')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/companies')}>
          <InstallationTable />
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          <InstallationForm />
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          <InstallationForm />
        </Fragment>
        
      </Fragment>

      <Fragment forRoute={getRoute('/clients')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/clients')}>
          <ClientTable />
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          <ClientForm />
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          <ClientForm />
        </Fragment>
        
      </Fragment>

      <Fragment forRoute={getRoute('/projects')}>

        <AbsoluteFragment withConditions={location => location.route === getRoute('/projects')}>
          <ProjectTable />
        </AbsoluteFragment>

        <Fragment forRoute='/add'>
          <ProjectForm />
        </Fragment>

        <Fragment forRoute='/edit/:id'>
          <ProjectForm />
        </Fragment>
        
      </Fragment>

      <Fragment forRoute={getRoute('/resources')}>

        <ResourceTree>
          <div className="routeWrapper">

            <AbsoluteFragment withConditions={location => location.route === getRoute('/resources')}>
              <div>loading resources</div>
            </AbsoluteFragment>

            <Fragment forRoute='/user/view/:parentid'>
              <ResourceTable 
                defaultTitle="Your library"
                selector={[
                  selectorFactories.resourceHome('user'),
                  plugins.resource.clipboard.selectors.container
                ]}
                dispatcher={[
                  plugins.resource.usertable.actions.dispatcher,
                  plugins.resource.clipboard.actions.dispatcher
                ]}
                searchSelector={plugins.resource.search.selectors.container}
                searchDispatcher={plugins.resource.search.actions.dispatcher}
              />
            </Fragment>

            <Fragment forRoute='/user/add/:parentid/:type'>
              <ResourceForm 
                selector={plugins.resource.userform.selectors.container}
                dispatcher={plugins.resource.userform.actions.dispatcher}
              />
            </Fragment>

            <Fragment forRoute='/user/edit/:parentid/:id'>
              <ResourceForm 
                selector={plugins.resource.userform.selectors.container}
                dispatcher={plugins.resource.userform.actions.dispatcher}
              />
            </Fragment>

            <Fragment forRoute='/system/view/:parentid'>
              <ResourceTable 
                readonly={true}
                defaultTitle="System library"
                selector={selectorFactories.resourceHome('system')}
                dispatcher={[
                  plugins.resource.systemtable.actions.dispatcher,
                  plugins.resource.clipboard.actions.dispatcher
                ]}
                searchSelector={plugins.resource.search.selectors.container}
                searchDispatcher={plugins.resource.search.actions.dispatcher}
              />
            </Fragment>

            <Fragment forRoute='/system/add/:parentid/:type'>
              <ResourceForm 
                readonly={true}
                selector={plugins.resource.systemform.selectors.container}
                dispatcher={plugins.resource.systemform.actions.dispatcher}
              />
            </Fragment>

            <Fragment forRoute='/system/edit/:parentid/:id'>
              <ResourceForm 
                readonly={true}
                selector={plugins.resource.systemform.selectors.container}
                dispatcher={plugins.resource.systemform.actions.dispatcher}
              />
            </Fragment>

          </div>
        </ResourceTree>
        
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