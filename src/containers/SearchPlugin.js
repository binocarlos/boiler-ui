import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'react-toolbox/lib/input'

import {
  mergeSelectors,
  mergeDispatchers
} from '../tools'

class SearchPlugin extends Component {
  render() {
    return (
      <Input 
        label='search'
        value={this.props.searchValue || ''}
        onChange={(v) => this.props.updateSearch(v)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => mergeSelectors(state, ownProps.selector)
const mapDispatchToProps = (dispatch, ownProps) => mergeDispatchers(dispatch, ownProps.dispatcher)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPlugin)