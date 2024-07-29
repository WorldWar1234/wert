const sharp = require('sharp');

function compress(req, res, input) {
  return sharp(input)
    .jpeg({ quality: req.params.quality })
    .toBuffer()
    .catch(() => {
      console.error('Error compressing image');
      return input; // Return the original image buffer
    });
}

module.exports = compress;
