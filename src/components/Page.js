import React, { PropTypes, Component } from 'react'

class Page extends Component {

  render() {
    return (
      <div style={{ flex: 1, overflowY: this.props.overflowY || 'auto', padding: (this.props.padding + 'rem') }}>
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  padding: PropTypes.number
}

Page.defaultProps = {
  padding: 1.8
}

export default Page