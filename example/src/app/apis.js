
import Ajax from 'boiler-ui/lib/api/ajax'
import Crud from 'boiler-ui/lib/api/crud'
import UserSelectors from 'boiler-ui/lib/plugins/user/selectors'

import URLS from './urls'

const userSelectors = UserSelectors(state => state.user)
const activeInstallation = (state) => userSelectors.status.currentInstallation(state)

const urlInjector = (baseurl) => (req, query) => {
  req.url = baseurl + req.url
  return req
}

const installationInjector = (baseurl) => (req, query) => {
  req.url = baseurl + req.url
  req.params = Object.assign({}, req.params, {
    i: activeInstallation(query.state)
  })
  return req
}

const systemInstallationInjector = (baseurl) => (req, query) => {
  req.url = baseurl + req.url
  req.params = Object.assign({}, req.params, {
    i: 'system'
  })
  return req
}

// functions we run each query object via before it hits Ajax
// they inject the base url and the installation id
const mapfns = {
  installation: urlInjector(URLS.installation),
  client: installationInjector(URLS.client),
  project: installationInjector(URLS.project),
  userresource: installationInjector(URLS.resource),
  systemresource: systemInstallationInjector(URLS.resource)
}

const user = {
  status: (query) => Ajax({
    method: 'get',
    url: URLS.user.status
  }),

  login: (query) => Ajax({
    method: 'post',
    url: URLS.user.login,
    data: query.data
  }),

  register: (query) => Ajax({
    method: 'post',
    url: URLS.user.register,
    data: query.data
  })
}

const BasicCrud = (map) => {
  return {
    list: (query) => Ajax(map(Crud.list(query), query)),
    get: (query) => Ajax(map(Crud.get(query), query)),
    post: (query) => Ajax(map(Crud.post(query), query)),
    put: (query) => Ajax(map(Crud.put(query), query)),
    delete: (query) => {
      return Crud.delete(query)
        .map(req => map(req, query))
        .map(Ajax)
    }
  }
}

const Resource = (map) => {
  const resource = BasicCrud(map)

  resource.children = (query) => {
    const params = query.params || {}

    const parentid = params.parentid
    const search = params.search

    const baseUrl = params.search ?
      'descendents' :
      'children'

    const url = '/' + baseUrl + (parentid ? '/' + parentid : '')

    return Ajax(map({
      method: 'get',
      url,
      params: {
        search,
        links: 'y'
      }
    }, query))
  }

  resource.listfolders = (query) => {
    query.params = query.params || {}
    query.params.qs = Object.assign({}, query.params.qs, {
      type: 'folder'
    })
    return resource.list(query)
  }

  // do we need to inject the parentid into the url
  // (yes if the current route.params.parentid is not 'root')
  resource.post = (query) => {
    const routerState = query.state.router
    const parentid = routerState.params.parentid

    query = map(Crud.post(query), query)

    if(parentid && parentid != 'root') {
      query.url += '/' + parentid
    }

    return Ajax(query)
  }

  resource.paste = (query) => {
    const routerState = query.state.router
    const parentid = routerState.params.parentid

    const pasteQuery = map(Crud.post({data:null}), query)

    pasteQuery.url += '/paste'

    if(parentid && parentid != 'root') {
      pasteQuery.url += '/' + parentid
    }

    pasteQuery.params = Object.assign({}, pasteQuery.params, query.params)

    return Ajax(pasteQuery)
  }

  return resource
}


const installation = BasicCrud(mapfns.installation)

installation.activate = (query) => Ajax({
  method: 'put',
  url: URLS.installation + '/' + query.params.id + '/activate'
})

const client = BasicCrud(mapfns.client)
client.newData = (query) => Ajax({
  method: 'get',
  url: URLS.client + '/new'
})

const userresource = Resource(mapfns.userresource)
const systemresource = Resource(mapfns.systemresource)
const resource = {
  allChildren: (query) => {
    return Promise.all([
      userresource.children(query),
      systemresource.children(query)
    ])
    .then(results => {
      return results.reduce((all, arr) => {
        return all.concat(arr)
      }, [])
    })
  }
}

const project = BasicCrud(mapfns.project)

const apis = {
  user,
  installation,
  client,
  userresource,
  systemresource,
  resource,
  project
}

export default apis