import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import { getRoute } from '../config/core'

class LinkWrapper extends Component {

  render() {
    const linkProps = Object.assign({}, this.props, {
      href: getRoute(this.props.href)
    })
    return (
      <Link {...linkProps} />
    )
  }

}

export default LinkWrapper