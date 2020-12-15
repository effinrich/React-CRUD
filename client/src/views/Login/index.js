/** @format */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Box, FormField, TextInput, Button } from 'grommet'

import ErrorBox from 'components/ErrorBox'
import { login } from 'store/auth'

const StyledLogin = styled(Box)`
  ${space};
`

//setting the initial values
const initialValues = {
  email: '',
  password: ''
}

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required')
})

const Login = () => {
  const dispatch = useDispatch()
  const { auth, error: fetchError } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      dispatch(login(values))
    }
  })

  const emailProps = formik.getFieldProps('email')
  const passwordProps = formik.getFieldProps('password')

  if (auth) {
    return <Redirect to="/" />
  }

  return (
    <StyledLogin fill align="center" justify="center">
      <Box
        width="medium"
        pad="large"
        round="small"
        background="white"
        elevation="small"
      >
        <form onSubmit={formik.handleSubmit}>
          <FormField htmlFor="email" label="Email" error={formik.errors.email}>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              a11yTitle="Email input field"
              {...emailProps}
            />
          </FormField>
          <FormField
            htmlFor="password"
            label="Password"
            error={formik.errors.password}
          >
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              a11yTitle="Password input field"
              {...passwordProps}
            />
          </FormField>
          <Box margin={{ top: 'medium' }} direction="row">
            <Button fill="horizontal" type="submit" primary label="Login" />
          </Box>
        </form>
        {fetchError && <ErrorBox data-testid="errorBox">{fetchError}</ErrorBox>}
      </Box>
    </StyledLogin>
  )
}

export default Login
