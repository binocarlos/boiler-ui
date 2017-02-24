import React, { Component, PropTypes } from 'react'
import { CardText } from 'react-toolbox/lib/card'

class ErrorCardText extends Component {

  render() {
    return this.props.error ?
      (
        <CardText>
          <div style={{color:'#880000'}}>
            {this.props.error}
          </div>
        </CardText>
      ) : null
  }

}

export default ErrorCardText