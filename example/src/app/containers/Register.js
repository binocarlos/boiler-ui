import React, { Component, PropTypes } from 'react'

import formfields from '../config/formfields'
import plugins from '../plugins'

import FormContainer from 'boiler-ui/lib/containers/Form'
import Register from '../components/Register'

class RegisterContainer extends Component {

  render() {

    return (
      <FormContainer
        formComponent={ Register }
        getFields={ formfields.register }
        formSelector={ plugins.user.selectors.register.form }
        apiSelector={ plugins.user.selectors.register.api }
        actions={ plugins.user.actions.register.form }
      />
    )
    
  }
}

export default RegisterContainer