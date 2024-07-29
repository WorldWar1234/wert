function bypass(req, res, content) {
  res.setHeader('content-length', content);
  res.status(200).send(content);
}

module.exports = bypass;
