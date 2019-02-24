import App, { Container } from 'next/app';
import React from 'react';
import * as Sentry from '@sentry/browser';

import Page from '../components/Page';

Sentry.init({
  dsn: 'https://6b3fd4fd6d754b18aa36f99e6406d7cd@sentry.io/1401140'
});

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}
