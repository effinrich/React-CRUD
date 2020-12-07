import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'

import InputField from 'components/InputField'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import { required } from 'utils/validations'

const validationRules = {
  email: [required('Username is required')],
  password: [required('password is required')]
}

const LoginForm = ({
  pristine,
  handleSubmit,
  submitting,
  error: submissionError
}) => {
  return (
    <div>
      {submissionError && <ErrorPencil mb={2}>{submissionError}</ErrorPencil>}
      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          name="email"
          component={InputField}
          validate={validationRules.email}
          placeholder="email"
          type="email"
          width={1}
        />
        <Field
          label="Password"
          name="password"
          component={InputField}
          validate={validationRules.password}
          placeholder="password"
          type="password"
          width={1}
        />
        <FlatButton
          primary
          type="submit"
          disabled={submitting || pristine}
          submitting={submitting}
          width={1}
          mt={2}
        >
          SIGN IN
        </FlatButton>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  error: PropTypes.string
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
