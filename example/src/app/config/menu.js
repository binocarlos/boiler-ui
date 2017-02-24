import URLS from '../urls'
import icons from './icons'
import { getRoute } from './core'

export const guest = [
  ['Login', icons.login, getRoute('/login')],
  ['Register', icons.register, getRoute('/register')],
  '-',
  ['Home', icons.home, getRoute('/')],
  ['Help', icons.help, getRoute('/help')],
  ['About', icons.about, getRoute('/about')],
]

export const user = [
  ['Dashboard', icons.dashboard, getRoute('/')],
  ['Companies', icons.installation, getRoute('/companies')],
  ['Clients', icons.client, getRoute('/clients')],
  ['Resources', icons.resource, getRoute('/resources')],
  ['Projects', icons.project, getRoute('/projects')],
  '-',
  ['Help', icons.help, getRoute('/help')],
  ['About', icons.about, getRoute('/about')],
  '-',
  ['Logout', icons.logout, () => {
    document.location = URLS.user.logout
  }]
]