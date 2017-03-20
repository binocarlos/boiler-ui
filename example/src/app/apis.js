
import Ajax from 'boiler-ui/lib/api/ajax'
import Crud from 'boiler-ui/lib/api/crud'
import UserSelectors from 'boiler-ui/lib/plugins/user/selectors'

import URLS from './urls'

const userSelectors = UserSelectors(state => state.user)

const urlInjector = (baseurl) => (req, query) => {
  req.url = baseurl + req.url
  return req
}
// functions we run each query object via before it hits Ajax
// they inject the base url and the installation id
const mapfns = {
  booking: urlInjector(URLS.booking)
}

/*
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
}*/

const user = {
  status: (query) => {
    return new Promise(resolve => {
      resolve({
        loggedIn: true,
        data: {
          id: 1
        }
      })
    })
  },

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

const FakeCrud = (map) => {
  return {
    list: (query) => new Promise(resolve => resolve([{
      id: 1,
      name: 'test'
    },{
      id: 2,
      name: 'test2'
    },{
      id: 3,
      name: 'test3'
    },{
      id: 4,
      name: 'test4'
    }])),
    get: (query) => new Promise(resolve => resolve({})),
    post: (query) => new Promise(resolve => resolve()),
    put: (query) => new Promise(resolve => resolve()),
    delete: (query) => new Promise(resolve => resolve())
  }
}

const booking = FakeCrud(mapfns.booking)

const apis = {
  user,
  booking
}

export default apis