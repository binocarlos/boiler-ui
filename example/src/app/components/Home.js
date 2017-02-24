import React, { Component, PropTypes } from 'react'

import UserFilter from 'boiler-ui/lib/containers/UserFilter'

import Dashboard from './Dashboard'
import Welcome from './Welcome'

class Home extends Component {
  render() {
    return (
      <UserFilter
        user={Dashboard}
        guest={Welcome}
        injectRedirect={true}
      />
    )
  }
}

export default Home