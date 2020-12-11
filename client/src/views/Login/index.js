/** @format */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { /*Field, Form,*/ useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { space } from 'styled-system'
// import { Box, Button, FormField, Heading, Card, TextInput } from 'grommet'
import { Box, FormField, Card, TextInput, Button } from 'grommet'

import { login } from 'store/auth'

const StyledLogin = styled.div`
  ${space};
`

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 8 characters length')
    .required('Password is required')
})

const Login = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(login(values))
    }
  })

  if (auth) {
    return <Redirect to="/dashboard" />
  }

  return (
    <StyledLogin>
      <Card
        width="medium"
        pad="medium"
        round="small"
        elevation="small"
        background="light-1"
      >
        <form onSubmit={formik.handleSubmit}>
          <FormField label="Email">
            <TextInput
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </FormField>
          <FormField label="Password">
            <TextInput
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
          </FormField>
          <Box margin={{ top: 'medium' }} direction="row">
            <Button fill="horizontal" type="submit" primary label="Login" />
          </Box>
        </form>
      </Card>
    </StyledLogin>
  )
}

export default Login
