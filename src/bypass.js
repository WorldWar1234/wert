function bypass(req, res, content) {
  const buffer = Buffer.from(content);
  res.setHeader('Content-Length', buffer.length);
  res.status(200).send(content);
}

module.exports = bypass;
