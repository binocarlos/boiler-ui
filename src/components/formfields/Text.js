import React, { PropTypes, Component } from 'react'
import Input from 'react-toolbox/lib/input'

class Text extends Component {

  render() {
    return (
      <Input 
        type={ this.props.type || 'text' }
        spellCheck={false}
        disabled={ this.props.readonly }
        label={ this.props.title } 
        value={ this.props.value || ''} 
        error={ this.props.error }
        onChange={ this.props.update }
        onBlur={ this.props.touch }
      />
    )
  }
}

Text.propTypes = {
  title: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired
}

Text.defaultProps = {
  
}

export default Text