const shouldCompress = require('./shouldCompress');
const compress = require('./compress');
const bypass = require('./bypass');

function handler(req, res) {
  // Logic to generate content or fetch from a data source
  const content = generateContent(req); // Replace with your logic

  if (shouldCompress(req)) {
    compress(req, res, content);
  } else {
    bypass(req, res, content);
  }
}

module.exports = handler;
