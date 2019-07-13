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
          'Content-Type': 'application/json'
        };
        
        const url = `${process.env.SLACK_URL}?email=${payload.fields.email}&token=${process.env.SLACK_TOKEN}&set_active=true`
        return axios
          .get(url, {
            headers
          })
          .then(r => {
            let responsePayload = {};
            console.log(r)
            if (r.data.error) {
              console.error('ERROR', r.data.error);
              Sentry.captureException(r.data.error);
              responsePayload = {
                statusText: 'ERROR',
                statusCode: 500,
                error: r.data.error
              };
            }
            else {
              responsePayload = {
                statusText: r.statusText,
                statusCode: r.status,
                ...responsePayload
              };
            }
            console.log(JSON.stringify(responsePayload))
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
