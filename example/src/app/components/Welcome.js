import React, { Component, PropTypes } from 'react'
import Page from 'boiler-ui/lib/components/Page'

import Link from './Link'
import { GuestMenu } from './Menu'

class Welcome extends Component {

  render() {

    return (
      <Page>
        <p>Welcome</p>
        <GuestMenu 
          hide={{
            'Home': true
          }} 
          ripple={false} 
          redirect={this.props.redirect}
        />
      </Page>
    )
  }

}

export default Welcome