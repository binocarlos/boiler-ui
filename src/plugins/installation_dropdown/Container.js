import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../components/Dropdown'

class InstallationDropdown extends Component {

  render() {

    if(!this.props.active) {
      return (
        <div></div>
      )
    }
    let data = this.props.installations.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    data.push({
      value: 'edit',
      label: 'edit...'
    })
    return (
      <Dropdown
        white
        label={ 'active ' + (this.props.title || 'installation') }
        data={ data }
        onChange={ this.props.onChange }
        value={ this.props.activeInstallation }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const loggedIn = ownProps.selectors.loggedIn(state)
  const activeInstallation = ownProps.selectors.currentInstallation(state)
  const installations = ownProps.selectors.installations(state) || []

  return {
    active: loggedIn ? true : false,
    activeInstallation,
    installations
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (val) => {
      if(val == 'edit') {
        dispatch(ownProps.editAction())
      }
      else {
        dispatch(ownProps.actions.trigger(val))  
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationDropdown)