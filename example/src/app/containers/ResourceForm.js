import React, { Component, PropTypes } from 'react'

import FormPlugin from 'boiler-ui/lib/containers/FormPlugin'
import FormToolbar from 'boiler-ui/lib/components/toolbars/Form'

import ResourceFinder from './ResourceFinder'

import formfields from '../config/formfields'
import icons from '../config/icons'
import plugins from '../plugins'

class ResourceForm extends Component {
  render() {
    return (
      <div>
        <FormPlugin 
          readonly={this.props.readonly}
          mainTitle='Resource'
          selector={this.props.selector}
          dispatcher={this.props.dispatcher}
          getFormFields={formfields.resource}
          getIcon={plugins.resource.getIcon}
          getItemTitle={plugins.resource.getItemTitle}
          getMainTitle={plugins.resource.getFormTitle}
          getButtons={(props) => (<FormToolbar {...props} />)}
        />
        <ResourceFinder />
      </div>
    )
  }
}

export default ResourceForm