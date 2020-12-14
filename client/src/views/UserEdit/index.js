/** @format */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FormField, TextInput, Box, Button } from 'grommet'
import styled from 'styled-components'
import { space } from 'styled-system'

import ErrorBox from 'components/ErrorBox'
import PageHeader from 'components/PageHeader'
import Spinner from 'assets/spinner'

import { fetchUserById, patchUser } from 'store/users'

const StyledUserEdit = styled(Box)`
  ${space};
`

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

const UserEdit = ({ match }) => {
  const dispatch = useDispatch()
  const { isLoading, isPatchUserSuccess, user, error } = useSelector(
    state => state.users
  )

  useEffect(() => {
    const userId = match.params.id
    const handleFetchUserById = async () => {
      await dispatch(fetchUserById(userId))
    }

    handleFetchUserById(userId)
  }, [dispatch, match])

  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(patchUser(values))
    }
  })

  const firstNameProps = formik.getFieldProps('firstName')
  const lastNameProps = formik.getFieldProps('lastName')
  const emailProps = formik.getFieldProps('email')

  if (isPatchUserSuccess) {
    return <Redirect to="/" />
  }

  return (
    <StyledUserEdit flex={false} pad="medium">
      <PageHeader name="Edit User" />
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
              placeholder="Enter your first name"
              a11yTitle="First name input field"
              {...firstNameProps}
            />
          </FormField>
          <FormField label="Last name" error={formik.errors.lastName}>
            <TextInput
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              a11yTitle="Last name input field"
              {...lastNameProps}
            />
          </FormField>
          <FormField label="Email" error={formik.errors.email}>
            <TextInput
              name="email"
              type="email"
              placeholder="Enter your email"
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
                label="Update"
                focusIndicator={false}
                icon={isLoading ? Spinner : undefined}
                disabled={!(formik.isValid && formik.dirty)}
              />
            </Box>
          </Box>
        </form>
        {error && <ErrorBox>{error}</ErrorBox>}
      </Box>
    </StyledUserEdit>
  )
}

UserEdit.propTypes = {
  /** redux-router props */
  match: PropTypes.object
}

export default UserEdit
