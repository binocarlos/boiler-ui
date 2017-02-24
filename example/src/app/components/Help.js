import React, { Component, PropTypes } from 'react'
import Page from 'boiler-ui/lib/components/Page'

import Link from './Link'

class Help extends Component {

  render() {

    return (
      <Page>
        this is the help page
        <p>
          <Link href="/">Dashboard</Link>
        </p>
      </Page>
    )
  }

}

export default Help