module.exports = {
  // Will only be available on the server side
  serverRuntimeConfig: {
    airtableToken: process.env.AIRTABLE_TOKEN
  },
  // Will be available on both server and client
  publicRuntimeConfig: {}
};
