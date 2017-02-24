import React, { Component, PropTypes } from 'react'
import Page from 'boiler-ui/lib/components/Page'

import { UserMenu } from './Menu'

class Dashboard extends Component {

  render() {

    return (
      <Page>
        <p>Dashboard</p>
        <UserMenu 
          hide={{
            'Dashboard': true
          }}
          ripple={false} 
          redirect={this.props.redirect}
        />
      </Page>
    )
  }

}

export default Dashboard