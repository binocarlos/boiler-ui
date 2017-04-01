import React, { Component, PropTypes } from 'react'

const STYLES = {
  section: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%'
  },
  content: {
    flex: '2',
    overflow: 'auto'
  }
}

class ToolbarLayout extends Component {

  render() {

    return (
      <section style={ STYLES.section }>
        <header>
          { this.props.toolbar }
        </header>
        <div style={ STYLES.content }>
          { this.props.children }
        </div>
        {
          this.props.footer ?
            (
              <footer>
                { this.props.footer }
              </footer>
            ) :
            null
        }
      </section>
    )
  }
}

export default ToolbarLayout