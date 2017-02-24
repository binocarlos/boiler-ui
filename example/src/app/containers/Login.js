import React, { Component, PropTypes } from 'react'

import formfields from '../config/formfields'
import plugins from '../plugins'

import FormContainer from 'boiler-ui/lib/containers/Form'
import Login from '../components/Login'

class LoginContainer extends Component {

  render() {

    return (
      <FormContainer
        formComponent={ Login }
        getFields={ formfields.login }
        formSelector={ plugins.user.selectors.login.form }
        apiSelector={ plugins.user.selectors.login.api }
        actions={ plugins.user.actions.login.form }
      />
    )
    
  }
}

export default LoginContainer