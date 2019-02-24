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
        payload = Buffer.concat(payload).toString();
        console.log('incoming payload:', payload);

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`
        };

        return axios
          .post(process.env.AIRTABLE_URL, JSON.parse(payload), {
            headers
          })
          .then(r => {
            if (r.error) {
              console.log('ERROR', e.error);
              Sentry.captureException(e.error);
            }

            res.writeHead(r.status, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ status: r.statusText }));
            res.end();
          })
          .catch(e => {
            Sentry.captureException(e);
            res.writeHead(r.status, { 'Content-Type': 'text/html' });
            res.write(JSON.stringify(e));
            res.end();
          });
      });
  } else {
    Sentry.captureMessage('non post request');
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.write('invalid stuff yo');
    res.end();
  }
};
