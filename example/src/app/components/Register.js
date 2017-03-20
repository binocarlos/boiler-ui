import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'

import Page from 'boiler-ui/lib/components/Page'
import FormFields from 'boiler-ui/lib/components/FormFields'

import { getRoute } from '../tools'
import Link from './Link'
import ErrorCardText from './ErrorCardText'


class Register extends Component {

  render() {
    return (
      <Page>
        <Card>
          <CardTitle
            title="Register"
            subtitle={(
              <span>
                Enter your details to create a new account - <Link href="/login">click here</Link> to login
              </span>
            )}
          />
          <CardText>
            <FormFields
              fields={this.props.fields}
              update={this.props.update}
              touch={this.props.touch}
            />
          </CardText>
          <ErrorCardText error={this.props.error} />
          <CardActions>
            <Button 
              label="Cancel" 
              onClick={() => this.props.redirect(getRoute('/'))}
            />
            <Button 
              label="Submit" 
              raised={this.props.valid} 
              primary={this.props.valid}
              onClick={() => this.props.submit(this.props.valid)}
            />
          </CardActions>
        </Card>
      </Page>
    )
  }

}

export default Register