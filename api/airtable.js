const axios = require('axios');

module.exports = async (req, res) => {
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

    axios
      .post(process.env.AIRTABLE_URL, JSON.parse(payload), {
        headers
      })
      .then(r => {
        // console.log(res);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end();
      })
      .catch(e => {
        console.log('ERROR', error);
        e.error && console.log('ERROR', e.error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end({ error: e.error });
      });
  } else {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('invalid stuff yo');
  }
};
