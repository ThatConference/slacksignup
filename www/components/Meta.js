import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

    <title>THAT Conference - Slack Signup</title>

    <meta name="description" content="Summer Camp For Geeks" />
    <meta name="keywords" content="THAT Conference, Tech Conference" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="THAT Conference" />
    <meta property="og:description" content="Summer Camp for Geeks!" />
    <meta property="og:url" content="https://slack.thatconference.com/" />
    <meta property="og:site_name" content="THAT Conference" />
    <meta property="og:image" content="https://s0.wp.com/i/blank.jpg" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:site" content="@thatconference" />
    <meta name="twitter:title" content="FILL ME OUT" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content="Summer Camp for Geeks!" />
    <meta
      name="twitter:image"
      content="https://www.thatconference.com/images/icons/opengraph.jpg"
    />

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  </Head>
);

export default Meta;
