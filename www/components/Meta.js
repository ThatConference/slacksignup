import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

    <title>THAT Conference - Slack Signup</title>

    <meta name="description" content="Summer Camp For Geeks Slack Signup" />
    <meta name="keywords" content="THAT Conference, Tech Conference" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="THAT Conference Slack Community" />
    <meta property="og:description" content="Summer Camp for Geeks Slack Community Signup!" />
    <meta property="og:url" content="https://thatslack.thatconference.com/" />
    <meta property="og:site_name" content="THAT Conference" />
    <meta property="og:image" content="https://www.thatconference.com/images/icons/opengraph.jpg" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:site" content="@thatconference" />
    <meta name="twitter:title" content="THAT Conference Slack Community" />
    <meta name="twitter:description" content="Summer Camp for Geeks Slack Community Signup!" />
    <meta name="twitter:card" content="summary" />
    <meta
      name="twitter:image"
      content="https://www.thatconference.com/images/icons/opengraph.jpg"
    />
    <meta name="twitter:image:alt" content="THAT Conference"></meta>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  </Head>
);

export default Meta;
