import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import styled from 'styled-components';

// Styled components
const StyledForm = styled(Form)`
  max-width: 300px;
  margin: auto;
`;

const StyledInput = styled(Field)`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Form component
interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validate = (values: SignUpFormValues) => {
  const errors: Partial<SignUpFormValues> = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
};

const onSubmit = (
  values: SignUpFormValues,
  { setSubmitting }: FormikHelpers<SignUpFormValues>
) => {
  // You can handle signup logic here
  console.log('Signup form submitted with values:', values);

  // Reset submitting state after handling the submission
  setSubmitting(false);
};

const App: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <div>
            <label htmlFor="firstName">First Name</label>
            <StyledInput type="text" name="firstName" />
            <StyledErrorMessage name="firstName" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <StyledInput type="text" name="lastName" />
            <StyledErrorMessage name="lastName" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <StyledInput type="email" name="email" />
            <StyledErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <StyledInput type="password" name="password" />
            <StyledErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <StyledInput type="password" name="confirmPassword" />
            <StyledErrorMessage name="confirmPassword" component="div" />
          </div>

          <div>
            <StyledButton type="submit" disabled={isSubmitting}>
              Sign Up
            </StyledButton>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};

export default App;
