import React, { Component, PropTypes } from 'react'
import { RelativeFragment as RouterRelative, AbsoluteFragment as RouterAbsolute } from 'redux-little-router'

export class RelativeFragment extends Component {
  render() {
    return (
      <RouterRelative {...this.props}>
        <div className='routeWrapper'>
          {this.props.children}
        </div>
      </RouterRelative>
    )
  }
}

export class AbsoluteFragment extends Component {
  render() {
    return (
      <RouterAbsolute {...this.props}>
        <div className='routeWrapper'>
          {this.props.children}
        </div>
      </RouterAbsolute>
    )
  }
}