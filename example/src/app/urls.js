const BASE = '/api/v1'

const URLS = {
  base: BASE,
  user: {
    status: BASE + '/status',
    login: BASE + '/login',
    register: BASE + '/register',
    logout: BASE + '/logout?redirect=/app'
  },
  installation: BASE + '/installations',
  client: BASE + '/clients',
  resource: BASE + '/resources',
  project: BASE + '/projects'
}

export default URLS