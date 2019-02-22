import nprogress from 'nprogress';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { above, below } from '../utilities';

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
          errors.email = 'Please fill in your email address.';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address.';
        }

        !values.firstName &&
          (errors.firstName = 'Please fill in your first name.');
        !values.lastName &&
          (errors.lastName = 'Please fill in your last name.');

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
        console.log(process.env.special);
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
          <div className="form-logo">
            <img
              src="/static/images/TC-Slack.png"
              alt="THAT Conference and Slack"
            />
          </div>
          <h1>Join THAT Slack!</h1>
          <p>
            Fill out the form to get an invite to THAT Slack and be a part of
            the community year-round.
          </p>
          <div className="form-group">
            <label>
              First Name:<span className="required">*</span>
            </label>
            <Field
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <span className="required">
              <ErrorMessage name="firstName" />
            </span>
          </div>

          <div className="form-group">
            <label>
              Last Name:<span className="required">*</span>
            </label>
            <Field
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            <span className="required">
              <ErrorMessage name="lastName" />
            </span>
          </div>

          <div className="form-group">
            <label>
              Email:<span className="required">*</span>
            </label>
            <Field
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span className="required">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="form-group">
            <div className="checkbox">
              <label>
                <Field
                  type="checkbox"
                  name="isPastCamper"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.isPastCamper}
                />
                I have attended THAT Conference in the past.
              </label>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" disabled={isSubmitting}>
              Add Me to Slack!
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
  margin: 4.5rem 0;
  padding: 3rem 1.5rem;
  width: 100%;
  max-width: 495px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 2.5rem;
  // Media Queries
  ${above.sm`
    margin: 7.5rem 0;
    padding: 5rem 6rem 6rem;
    border: 4px solid #e6d6bc;
  `}

  // Sub Elements
  h1 {
    margin-bottom: 0;
    color: #627f78;
    font-weight: bold;
  }
  p {
    margin-top: 0;
  }
  form {
    width: 100%;
  }

  .form-group {
    margin-bottom: 20px;
    width: 100%;

    // Sub Elements
    label {
      padding-right: 15px;
      display: block;
      width: 100%;
    }
    input {
      padding: 8px 6px;
      width: 100%;
      border: 1px solid #ccbda5;
    }
    .checkbox {
      margin-left: 0;
      // Sub  elements
      label {
        display: inline-block;
        width: auto;
      }
      input {
        margin-right: 10px;
        width: auto;
      }
    }
    .required {
      color: red;
    }
  }

  .form-submit {
    // Sub Elements
    button {
      margin-top: 15px;
      padding: 15px;
      width: 100%;
      background-color: #829641;
      color: #f1e1c0;
      font-size: 20px;
      font-weight: 700;
      border: none;
      border-bottom: 5px solid #616a27;
      cursor: pointer;
      // Pseudos
      &:focus,
      &:hover {
        background-color: #798b3c;
      }
      &:active {
        border: none;
      }
    }
  }

  .form-logo img {
    max-width: 100%;
  }
`;
