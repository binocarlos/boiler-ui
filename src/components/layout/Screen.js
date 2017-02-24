import React, { Component, PropTypes } from 'react'
import { Layout } from 'react-toolbox/lib/layout'

class ScreenLayout extends Component {

  render() {

    return (
      <Layout>
        {this.props.sidebar}
        {this.props.children}
      </Layout>
    )
  }
}

export default ScreenLayout