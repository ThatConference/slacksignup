const axios = require('axios');
import * as Sentry from '@sentry/node';

module.exports = async (req, res) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });

  console.log('API called');
  if (req.method === 'POST') {
    let payload = [];
    await req
      .on('data', chunk => {
        payload.push(chunk);
      })
      .on('end', () => {
        payload = Buffer.concat(payload).toString();
        console.log('incoming payload:', payload);
      });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`
    };

    await axios
      .post(process.env.AIRTABLE_URL, JSON.parse(payload), {
        headers
      })
      .then(r => {
        if (r.error) {
          console.log('ERROR', e.error);
          Sentry.captureException(e.error);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(r);
      })
      .catch(e => {
        Sentry.captureException(e);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(e);
      });
  } else {
    Sentry.captureMessage('non post request');
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('invalid stuff yo');
  }
};
