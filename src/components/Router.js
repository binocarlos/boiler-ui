import React, { Component, PropTypes } from 'react'
import { Fragment } from 'redux-little-router'

export class RelativeFragment extends Component {
  render() {
    return (
      <Fragment {...this.props}>
        <div className='routeWrapper'>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

export class AbsoluteFragment extends Component {
  render() {
    return (
      <Fragment {...this.props}>
        <div className='routeWrapper'>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}