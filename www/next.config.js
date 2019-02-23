module.exports = {
  target: 'serverless',
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY // Pass through env variables
    // reCaptchaSiteKey: '6Ld2d5MUAAAAAHXiYgZGeGKgvidYlTW3zQ11QPQA' // Pass through env variables
  }
};
