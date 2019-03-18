const axios = require('axios');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

module.exports = async (req, res) => {
  console.log('API called');
  if (req.method === 'POST') {
    let payload = [];
    req
      .on('error', err => {
        Sentry.captureException(err);
      })
      .on('data', chunk => {
        payload.push(chunk);
      })
      .on('end', () => {
        payload = JSON.parse(Buffer.concat(payload).toString());
        console.log('incoming payload:', payload);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`
        };

        /* example payload 
          {
            "fields": {
              "firstName":"",
              "lastName":"",
              "email":"","
              isPastCamper":false,
              "recaptcha":""
          }
        */

        payload.fields.recaptcha && delete payload.fields.recaptcha;

        return axios
          .post(process.env.AIRTABLE_URL, payload, {
            headers
          })
          .then(r => {
            let responsePayload = {};
            if (r.error) {
              console.error('ERROR', e.error);
              Sentry.captureException(e.error);
              responsePayload = {
                error: e.error
              };
            }

            responsePayload = {
              statusText: r.statusText,
              statusCode: r.status,
              ...responsePayload
            };

            res.writeHead(r.status, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(responsePayload));
            res.end();
          })
          .catch(e => {
            console.error(payload);
            Sentry.captureException(e);

            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write(JSON.stringify(e.message));
            res.end();
          });
      });
  } else {
    console.error('non post request');
    Sentry.captureMessage('non post request');
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.write('invalid stuff yo');
    res.end();
  }
};
