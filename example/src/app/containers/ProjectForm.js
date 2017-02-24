import React, { Component, PropTypes } from 'react'

import FormPlugin from 'boiler-ui/lib/containers/FormPlugin'
import FormToolbar from 'boiler-ui/lib/components/toolbars/Form'

import formfields from '../config/formfields'
import icons from '../config/icons'
import plugins from '../plugins'

class ProjectForm extends Component {
  render() {
    return (
      <FormPlugin 
        selector={plugins.project.form.selectors.container}
        dispatcher={plugins.project.form.actions.dispatcher}
        getFormFields={formfields.project}
        getIcon={() => icons.project}
        getItemTitle={plugins.project.getItemTitle}
        getMainTitle={plugins.project.getFormTitle}
        getButtons={(props) => (<FormToolbar {...props} />)}
      />
    )
  }
}

export default ProjectForm