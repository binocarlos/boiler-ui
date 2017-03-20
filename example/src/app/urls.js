const BASE = '/api/v1'

const URLS = {
  base: BASE,
  user: {
    status: BASE + '/status',
    login: BASE + '/login',
    register: BASE + '/register',
    logout: BASE + '/logout?redirect=/app'
  },
  booking: BASE + '/bookings'
}

export default URLS