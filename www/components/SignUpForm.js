import nprogress from 'nprogress';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import Recaptcha from 'react-recaptcha';
import styled from 'styled-components';
import * as Sentry from '@sentry/browser';

import { above, below } from '../utilities';

// Can use this function to override the fetch call when running locally
// to test through success and error responses.
// ---------------------------------------------------------------------
// const fetch = (url, options) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(function() {
//       resolve({ json() { return { status: 200, error: false } } });
//     }, 300);
//   })
// }

let recaptchaInstance;

const resetRecaptcha = () => {
  recaptchaInstance.reset();
};

const SignUpForm = ({ className }) => (
  <div className={className}>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        isPastCamper: false,
        recaptcha: '',
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

        !values.recaptcha &&
          (errors.recaptcha = 'Please verify your humanity');

        return errors;
      }}
      onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
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
            'Content-Type': 'application/json'
          }
        };
        let endpoint = ''
        let successMessage = ''

        if (process.env.approvalRequired) {
          endpoint = 'airtable.js'
          successMessage = 'Thank you for signing up. Your request has been submitted and is under review. Please watch your email for an invitation to THAT Slack.'
        }
        else {
          endpoint = 'slack.js'
          successMessage = 'Thank you for signing up. Please watch your email for an invitation to THAT Slack.'
        }

        fetch(`/api/${endpoint}`, options)
          .then(response => response.json())
          .then(
            response =>
              response.error && setStatus({ apiError: response.error })
          )
          .then(setSubmitting(false))
          .then(resetForm())
          .then(resetRecaptcha)
          .then(
            setStatus({
              success: successMessage
            })
          )
          .then(nprogress.done())
          .catch(e => {
            nprogress.done();
            setSubmitting(false);
            setStatus({
              apiError: {
                message: 'whoa we broke bad!'
              }
            });

            Sentry.captureException(e);
          });
      }}
    >
      {({
        errors,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
        setFieldValue,
        touched
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
          {status && status.success && <div className="form-success"><p className="form-success-title">🎉 Success! 🎉</p><p className="form-success-text">{status.success}</p></div>}
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

          <div className="form-group">
            <Recaptcha
              ref={e => recaptchaInstance = e}
              render="explicit"
              sitekey={ process.env.recaptchaSiteKey }
              onloadCallback={() => {
                setFieldValue("recaptcha", '');
              }}
              verifyCallback={(response) => {
                setFieldValue("recaptcha", response);
              }}
            />
            {errors.recaptcha
              && touched.recaptcha && (
              <span className='required'>{errors.recaptcha}</span>
            )}
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  .form-success {
    margin: 30px 0;
    padding: 15px 15px 5px;
    background-color: rgba(51, 169, 94, 0.60);
    color: #fff;
    border-radius: 8px;
    box-shadow: 3px 3px 0 #77b389;
    text-shadow: 2px 2px 0 #619c73;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .form-success-title {
    margin-bottom: 5px;
    padding-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
  .form-success-text {
    text-align: center;
    font-weight: bold;
  }
`;