import nprogress from 'nprogress';
import getConfig from 'next/config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import styled from 'styled-components';

const { serverRuntimeConfig } = getConfig();

const SignUpForm = ({ className }) => (
  <div className={className}>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        isPastCamper: false
      }}
      validate={values => {
        let errors = {};

        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        !values.firstName && (errors.firstName = 'Required');
        !values.lastName && (errors.lastName = 'Required');

        return errors;
      }}
      onSubmit={(values, { setStatus, setSubmitting }) => {
        setStatus(undefined);
        nprogress.start();
        const payload = {
          fields: {
            ...values
          }
        };

        const options = {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer TOKEN`
          }
        };

        fetch('AIRTABLE URL HERE', options)
          .then(response => response.json())
          .then(
            response =>
              response.error && setStatus({ apiError: response.error })
          )
          .then(setSubmitting(false))
          .then(nprogress.done());
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status
      }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <Field
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <ErrorMessage name="firstName" />
          </div>

          <div>
            <label>Last Name:</label>
            <Field
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            <ErrorMessage name="lastName" />
          </div>

          <div>
            <label>Email:</label>
            <Field
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label>Have you attended THAT Conference in the Past.</label>
            <Field
              type="checkBox"
              name="isPastCamper"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.isPastCamper}
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              Add Me!
            </button>

            {status && status.apiError && (
              <div>API Error: {status.apiError.message}</div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default styled(SignUpForm)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
