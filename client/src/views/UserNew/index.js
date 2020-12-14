/** @format */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FormField, TextInput, Box, Button } from 'grommet'
import styled from 'styled-components'
import { space } from 'styled-system'

import ErrorBox from 'components/ErrorBox'
import PageHeader from 'components/PageHeader'
import Spinner from 'assets/spinner'

import { createUser } from 'store/users'

const StyledUserNew = styled(Box)`
  ${space};
`

//setting the initial values
const initialValues = {
  firstName: '',
  lastName: '',
  email: ''
}

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .required('First name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required')
})

const UserNew = () => {
  const dispatch = useDispatch()
  const { isCreateUserSuccess, isLoading, error } = useSelector(
    state => state.users
  )

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(createUser(values))
    }
  })

  const firstNameProps = formik.getFieldProps('firstName')
  const lastNameProps = formik.getFieldProps('lastName')
  const emailProps = formik.getFieldProps('email')

  if (isCreateUserSuccess) {
    return <Redirect to="/" />
  }

  return (
    <StyledUserNew flex={false} pad="medium">
      <PageHeader name="New User" />
      <Box
        width="100%"
        pad="medium"
        round="small"
        background="white"
        fill
        elevation="small"
      >
        <form onSubmit={formik.handleSubmit}>
          <FormField label="First name" error={formik.errors.firstName}>
            <TextInput
              name="first_name"
              type="text"
              a11yTitle="First name input field"
              {...firstNameProps}
            />
          </FormField>
          <FormField label="Last name" error={formik.errors.lastName}>
            <TextInput
              name="last_name"
              type="text"
              a11yTitle="Last name input field"
              {...lastNameProps}
            />
          </FormField>
          <FormField label="Email" error={formik.errors.email}>
            <TextInput
              name="email"
              type="email"
              a11yTitle="Email input field"
              {...emailProps}
            />
          </FormField>
          <Box margin={{ top: 'medium' }} direction="row">
            <Box>
              <Button
                type="submit"
                primary
                reverse
                label="Create"
                focusIndicator={false}
                icon={isLoading ? Spinner : undefined}
                disabled={!(formik.isValid && formik.dirty)}
              />
            </Box>
          </Box>
        </form>
        {error && <ErrorBox>{error}</ErrorBox>}
      </Box>
    </StyledUserNew>
  )
}

export default UserNew
