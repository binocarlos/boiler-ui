import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import routerActions from '../actions/router'
import { getUserState } from '../tools'

class UserFilter extends Component {
  render() {
    const UserComponent = this.props.user
    const GuestComponent = this.props.guest
    const componentProps = this.props.injectRedirect ?
      Object.assign({}, this.props.componentProps, {
        redirect: this.props.redirect
      }) :
      this.props.componentProps || {}
    return this.props.loggedIn ?
      <UserComponent {...componentProps} /> :
      <GuestComponent {...componentProps} />
  }
}

UserFilter.propTypes = {
  user: PropTypes.func.isRequired,
  guest: PropTypes.func.isRequired
}

export default connect(
  getUserState,
  dispatch => {
    return {
      redirect: (path) => dispatch(routerActions.push(path))
    }
  }
)(UserFilter)