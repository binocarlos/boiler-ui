import React, { Component, PropTypes } from 'react'
import { Card, CardText } from 'react-toolbox/lib/card'

import Page from './Page'
import FormFields from './FormFields'

class Form extends Component {

  render() {
    return (
      <Page overflowY='visible'>
        <FormFields
          fields={this.props.fields}
          update={this.props.update}
          touch={this.props.touch}
        />
      </Page>
    )
  }

}

export default Form