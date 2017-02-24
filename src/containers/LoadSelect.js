// run a trigger action on mount
// run a selector for mapStatToProps
// render a given component with props
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class LoadSelect extends Component {
  componentDidMount() {
    this.props.loadData()
  }
  render() {
    const Component = this.props.component
    return (
      <Component {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps.selector(state)
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const trigger = ownProps.trigger
  return {
    loadData: () => {
      dispatch(trigger())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadSelect)