/** @format */
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import LoginForm from 'grommet/components/LoginForm'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { space } from 'styled-system'
import { Helmet } from 'react-helmet'
import { SubmissionError } from 'redux-form/immutable'

import theme from 'theme'
import Flex from 'components/Flex'
import ShadowBox from 'components/ShadowBox'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import FlatButton from 'components/FlatButton'
import apiErrorHandler from 'utils/apiErrorHandler'

// import LoginForm from './partials/LoginForm'

const StyledLogin = styled.div`
  ${space};
`

export default class LoginComponent extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
    loginUser: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  handleSubmit = async data => {
    const { error: loginError, payload } = await this.props.loginUser({
      email: data.get('email').toLowerCase(),
      password: data.get('password')
    })

    if (loginError) {
      throw new SubmissionError({
        _error: apiErrorHandler(payload, payload.error)
      })
    }
  }

  render() {
    const { token } = this.props

    if (token) {
      return <Redirect to='/dashboard' />
    }

    return (
      <StyledLogin pt={[2, 4]}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Flex justifyContent='center'>
          <ShadowBox level={1} bg='white' p={3} width={[9 / 10, 1 / 2]}>
            <Heading fontSize={4}>Welcome back</Heading>
            <BodyCopy pb={2}>
              Sign in to manage your Freebird Business Account
            </BodyCopy>
            <LoginForm onSubmit={this.handleSubmit} />
            <BodyCopy pt={3} textAlign='center'>
              Not a business and need support? Please click the green help
              button in the bottom right of the screen.
            </BodyCopy>
            <FlatButton
              overBg='none'
              overColor={theme.primaryButtonOverBg}
              to='/password-recovery'
              width={1}
              color={theme.brandColor}
            >
              Forgot password?
            </FlatButton>
          </ShadowBox>
        </Flex>
      </StyledLogin>
    )
  }
}
