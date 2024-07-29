
const sharp = require('sharp');

function compress(req, res, input) {
  const format = req.params.webp ? 'webp' : 'jpeg';

  return sharp(input)
    .toFormat(format, {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    })
    .toBuffer()
    .catch(err => {
      console.error('Error compressing image:', err);
      return input; // Return the original image buffer
    });
}

module.exports = compress;
